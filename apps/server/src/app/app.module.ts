import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrpcModule } from '@server/app/trpc/trpc.module';
import { AppRouter } from './app.router';
import { UsersModule } from '@server/users/users.module';
import { AuthModule } from '@server/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OrganizationModule } from '@server/organization/organization.module';
import { ContractorsModule } from '@server/contractors/contractors.module';
import { InterventionPaymentConditionsModule } from '@server/intervention_payment_conditions/intervention_payment_conditions.module';
import { InterventionPaymentsModule } from '@server/intervention_payments/intervention_payments.module';
import { InterventionsModule } from '@server/interventions/interventions.module';
import { SitesModule } from '@server/sites/sites.module';
import { WorksModule } from '@server/works/works.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      //todo:put in .env file
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
    ContractorsModule,
    InterventionPaymentConditionsModule,
    InterventionPaymentsModule,
    InterventionsModule,
    SitesModule,
    WorksModule,
  ],
  controllers: [],
  providers: [AppRouter],
})
export class AppModule {}
