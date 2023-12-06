import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterventionPayment } from "./intervention_payments.entity";
import { InterventionPaymentsRouter } from "./intervention_payments.router";
import { InterventionPaymentsService } from "./intervention_payments.service";
import { InterventionsModule } from "@server/interventions/interventions.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([InterventionPayment]),
    InterventionsModule
  ],
  controllers: [],
  providers: [InterventionPaymentsService, InterventionPaymentsRouter],
  exports: [
    TypeOrmModule.forFeature([InterventionPayment]),
    InterventionPaymentsService,
    InterventionPaymentsRouter,
  ]
})
export class InterventionPaymentsModule {}
