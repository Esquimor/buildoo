
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import jwt from "jsonwebtoken"
import { scryptSync, randomBytes } from "node:crypto"

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.usersService.findOneByEmail(email);

    const passwordHashed = await scryptSync(password, user.salt, 42).toString("base64");

    if (!(user.password === passwordHashed)) {
      throw new UnauthorizedException();
    }
    const token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: user.id
    }, process.env.JWT_PASSWORD) as string;

    return token;
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

    const isAdded = await this.usersService.addAUser({email, password: passwordHashed, salt});

    return isAdded;
  }

  async decodeToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_PASSWORD) as { id: string };
      return decoded
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}