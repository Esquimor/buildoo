import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterventionPaymentCondition } from "./intervention_payment_conditions.entity";
import { InterventionPaymentConditionsRouter } from "./intervention_payment_conditions.router";
import { InterventionPaymentConditionsService } from "./intervention_payment_conditions.service";
import { InterventionPaymentsModule } from "@server/intervention_payments/intervention_payments.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([InterventionPaymentCondition]),
    InterventionPaymentsModule
  ],
  controllers: [],
  providers: [InterventionPaymentConditionsService, InterventionPaymentConditionsRouter],
  exports: [
    TypeOrmModule.forFeature([InterventionPaymentCondition]),
    InterventionPaymentConditionsService,
    InterventionPaymentConditionsRouter,
  ]
})
export class InterventionPaymentConditionsModule {}
