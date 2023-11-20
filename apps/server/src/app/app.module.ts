import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrpcModule } from '@server/app/trpc/trpc.module';

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
    TrpcModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
