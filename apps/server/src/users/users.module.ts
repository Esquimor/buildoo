import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersRouter } from '@server/users/users.router';
import { TrpcModule } from '@server/app/trpc/trpc.module';
import { TrpcService } from '@server/app/trpc/trpc.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TrpcModule],
  controllers: [],
  providers: [UsersService, TrpcService, UsersRouter],
  exports: [UsersRouter]
})
export class UsersModule {}
