import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({id})
  }

  async findByIdWithOrganization(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {id},
      relations: ["organization"]
    })
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({email})
  }

  async addAUser(user: { email: string, password: string, salt: string, organizationId: string; }) {
    const userSaved = await this.usersRepository.save(user)
    return userSaved
  }
}
