import { Module, forwardRef  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@server/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthRouter } from './auth.router';
import { OrganizationModule } from '@server/organization/organization.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    OrganizationModule,
  ],
  providers: [AuthService, AuthRouter],
  exports: [AuthService, AuthRouter]
})
export class AuthModule {}
