import { Module, forwardRef } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { AuthModule } from '@server/auth/auth.module';
import { AuthService } from '@server/auth/auth.service';
import { UsersModule } from '@server/users/users.module';
import { UsersService } from '@server/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@server/users/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [
    TrpcService,
    AuthService,
    UsersService, 
  ],
  exports: [TrpcService]
})
export class TrpcModule {}