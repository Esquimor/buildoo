import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRouter } from '@server/users/users.router';
import { TrpcModule } from '@server/app/trpc/trpc.module';
import { TrpcService } from '@server/app/trpc/trpc.service';
import { AuthModule } from '@server/auth/auth.module';
import { AuthService } from '@server/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => TrpcModule), forwardRef(() => AuthModule)],
  controllers: [],
  providers: [UsersService, TrpcService, UsersRouter, AuthService],
  exports: [UsersService]
})
export class UsersModule {}
