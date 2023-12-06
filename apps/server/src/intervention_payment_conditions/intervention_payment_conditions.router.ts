import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { InterventionPaymentsService } from '@server/intervention_payments/intervention_payments.service';
import { InterventionPaymentConditionsService } from './intervention_payment_conditions.service';
import { InterventionPaymentCondition } from './intervention_payment_conditions.entity';

@Injectable()
export class InterventionPaymentConditionsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly interventionPaymentsService: InterventionPaymentsService,
    private readonly interventionPaymentConditionsService: InterventionPaymentConditionsService,
  ) {}

  interventionPaymentConditionsRouter = this.trpc.router({
    get: this.trpc.authentificatedProcedure
      .query(() =>  {
        return true
      }),
    create: this.trpc.authentificatedProcedure
      .input(z.object({
        intervention_payment_id: z.string(),
        condition: z.string(),
        completed: z.boolean(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            intervention_payment_id,
            condition,
            completed
          } = input;

          const getInterventionPayment = await this.interventionPaymentsService
            .getInterventionPaymentWithInterventionWithContractorById(intervention_payment_id);

          if (getInterventionPayment.intervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const interventionPaymentCondition = new InterventionPaymentCondition();
          interventionPaymentCondition.condition = condition;
          interventionPaymentCondition.completed = completed;
          interventionPaymentCondition.interventionPaymentId = intervention_payment_id;

          const interventionPaymentConditionSaved = await this.interventionPaymentConditionsService
            .createInterventionPaymentCondition(interventionPaymentCondition);

          return interventionPaymentConditionSaved;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    edit: this.trpc.authentificatedProcedure
      .input(z.object({
        id: z.string(),
        condition: z.string().optional(),
        completed: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            id,
            condition,
            completed
          } = input;

          const getInterventionPaymentCondition = await this.interventionPaymentConditionsService
            .getInterventionPaymentConditionWithInventionPaymentWithInterventionWithContractorById(id);

          if (getInterventionPaymentCondition.intervention_payment.intervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          if (!!condition) {
            getInterventionPaymentCondition.condition = condition;
          }
          if (typeof completed == "boolean") {
            getInterventionPaymentCondition.completed = completed;
          }

          const interventionPaymentConditionEdited = await this.interventionPaymentConditionsService
            .editInterventionPaymentCondition(getInterventionPaymentCondition);

          return interventionPaymentConditionEdited;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    delete: this.trpc.authentificatedProcedure
      .input(z.object({
        id: z.string(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            id,
          } = input;

          const getInterventionPaymentCondition = await this.interventionPaymentConditionsService
            .getInterventionPaymentConditionWithInventionPaymentWithInterventionWithContractorById(id);

          if (getInterventionPaymentCondition.intervention_payment.intervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const interventionPaymentConditionDeleted = await this.interventionPaymentConditionsService
            .deleteInterventionPaymentConditionById(id);

          return interventionPaymentConditionDeleted;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type InterventionPaymentConditionsRouterType = InterventionPaymentConditionsRouter[`interventionPaymentConditionsRouter`];