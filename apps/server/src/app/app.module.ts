import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrpcModule } from '@server/app/trpc/trpc.module';
import { AppRouter } from './app.router';
import { UsersModule } from '@server/users/users.module';
import { TrpcService } from './trpc/trpc.service';
import { UsersRouter } from '@server/users/users.router';
import { UsersService } from '@server/users/users.service';
import { AuthModule } from '@server/auth/auth.module';
import { AuthRouter } from '@server/auth/auth.router';
import { AuthService } from '@server/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { User } from '@server/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'buildoo',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TrpcModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [],
  providers: [AppRouter, TrpcService, UsersRouter, UsersService, AuthRouter, AuthService],
})
export class AppModule {}
