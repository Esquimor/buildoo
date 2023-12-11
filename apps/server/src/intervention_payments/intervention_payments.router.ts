import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { InterventionsService } from '@server/interventions/interventions.service';
import { InterventionPaymentsService } from './intervention_payments.service';
import { InterventionPayment } from './intervention_payments.entity';

@Injectable()
export class InterventionPaymentsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly interventionsService: InterventionsService,
    private readonly interventionPaymentsService: InterventionPaymentsService,
  ) {}

  interventionPaymentsRouter = this.trpc.router({
    get: this.trpc.authentificatedProcedure
      .query(() =>  {
        return true
      }),
    create: this.trpc.authentificatedProcedure
      .input(z.object({
        intervention_id: z.string(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            intervention_id,
          } = input;

          const getIntervention = await this.interventionsService
            .getInterventionWithContractorById(intervention_id);

          if (getIntervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const interventionPayment = new InterventionPayment();
          interventionPayment.interventionId = intervention_id;

          const interventionPaymentSaved = await this.interventionPaymentsService
            .createInterventionPayment(interventionPayment);

          return interventionPaymentSaved;
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
        name: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            id,
          } = input;

          const getInterventionPayment = await this.interventionPaymentsService
            .getInterventionPaymentWithInterventionWithContractorById(id);

          if (getInterventionPayment.intervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const interventionPaymentEdited = await this.interventionPaymentsService
            .editInterventionPayment(getInterventionPayment);

          return interventionPaymentEdited;
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

          const getInterventionPayment = await this.interventionPaymentsService
            .getInterventionPaymentWithInterventionWithContractorById(id);

          if (getInterventionPayment.intervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const interventionPaymentDeleted = await this.interventionPaymentsService
            .deleteInterventionPaymentById(id);

          return interventionPaymentDeleted;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type InterventionPaymentsRouterType = InterventionPaymentsRouter[`interventionPaymentsRouter`];