import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrpcModule } from '@server/app/trpc/trpc.module';
import { AppRouter } from './app.router';
import { UsersModule } from '@server/users/users.module';
import { TrpcService } from './trpc/trpc.service';
import { UsersRouter } from '@server/users/users.router';
import { UsersService } from '@server/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'buildoo',
      entities: [],
      synchronize: true,
    }),
    TrpcModule,
    UsersModule
  ],
  controllers: [],
  providers: [AppRouter, TrpcService, UsersRouter, UsersService],
})
export class AppModule {}
