import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrpcModule } from '@server/app/trpc/trpc.module';
import { AppRouter } from './app.router';
import { UsersModule } from '@server/users/users.module';
import { AuthModule } from '@server/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from '@server/projects/projects.module';
import { OrganizationModule } from '@server/organization/organization.module';
import { ContractorsModule } from '@server/contractors/contractors.module';

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
    OrganizationModule,
    UsersModule,
    AuthModule,
    ProjectsModule,
    ContractorsModule,
  ],
  controllers: [],
  providers: [AppRouter],
})
export class AppModule {}
