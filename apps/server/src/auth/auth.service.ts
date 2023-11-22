
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import jwt from "jsonwebtoken"
import { scryptSync, randomBytes } from "node:crypto"
import { OrganizationService } from '@server/organization/organization.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private organizationsService: OrganizationService
  ) {}

  async signIn(email: string, password: string): Promise<{
    expiredAt: number;
    token: string;
    userId: string;
  }> {
    const user = await this.usersService.findOneByEmail(email);

    const passwordHashed = await scryptSync(password, user.salt, 42).toString("base64");

    if (!(user.password === passwordHashed)) {
      throw new UnauthorizedException();
    }

    const expiredAt = Math.floor(Date.now() / 1000) + (60 * 60 * 24);

    const token = jwt.sign({
      exp: expiredAt,
      data: user.id
    }, process.env.JWT_PASSWORD) as string;

    return {
      expiredAt,
      token,
      userId: user.id
    };
  }

  async register(email: string, password: string) {
    const userAlreadyCreated = await this.usersService.findOneByEmail(email);

    if (userAlreadyCreated) {
      throw new ConflictException();
    }

    const salt = randomBytes(8).toString('base64');
    const passwordHashed = await scryptSync(password, salt, 42).toString("base64");

    if (!passwordHashed) {
      throw new InternalServerErrorException();
    }

    const newOrganization = await this.organizationsService.addOrganization({ name: email });
    const isAdded = await this.usersService.addAUser({email, password: passwordHashed, salt, organizationId: newOrganization.id});

    return isAdded;
  }

  async decodeToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD) as { data: string };
      return decoded
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}