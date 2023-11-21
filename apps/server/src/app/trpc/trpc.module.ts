import { Module, Global , forwardRef } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { AuthModule } from '@server/auth/auth.module';
import { UsersModule } from '@server/users/users.module';

@Global()
@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule)
  ],
  controllers: [],
  providers: [
    TrpcService,
  ],
  exports: [TrpcService]
})
export class TrpcModule {}