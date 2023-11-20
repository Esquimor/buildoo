import { Module, forwardRef } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { UsersRouter } from '@server/app/trpc/users.router';
import { UsersModule } from '@server/users/users.module';
import { UsersService } from '@server/users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter, UsersService, UsersRouter],
})
export class TrpcModule {}