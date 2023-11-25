import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRouter } from '@server/users/users.router';
import { AuthModule } from '@server/auth/auth.module';
import { OrganizationModule } from '@server/organization/organization.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), OrganizationModule],
  controllers: [],
  providers: [UsersService, UsersRouter],
  exports: [UsersService, TypeOrmModule.forFeature([User]), UsersRouter]
})
export class UsersModule {}
