import { Module, forwardRef  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@server/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthRouter } from './auth.router';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule
  ],
  providers: [AuthService, AuthRouter],
  exports: [AuthService, AuthRouter]
})
export class AuthModule {}
