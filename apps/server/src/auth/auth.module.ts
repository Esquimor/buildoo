import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@server/users/users.module';
import { TrpcModule } from '@server/app/trpc/trpc.module';
import { TrpcService } from '@server/app/trpc/trpc.service';
import { UsersService } from '@server/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { User } from '@server/users/entities/user.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TrpcModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersService, AuthService, TrpcService]
})
export class AuthModule {}
