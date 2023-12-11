import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { z } from 'zod';
import { WorksService } from './works.service';
import { SitesService } from '@server/sites/sites.service';
import { Work } from './works.entity';
import { TRPCError } from '@trpc/server';
import { WorkType } from '@shared-type';
import { Intervention } from '@server/interventions/interventions.entity';
import { ContractorsService } from '@server/contractors/contractors.service';
import { Contractor } from '@server/contractors/contractors.entity';
import { InterventionPayment } from '@server/intervention_payments/intervention_payments.entity';
import { InterventionPaymentCondition } from '@server/intervention_payment_conditions/intervention_payment_conditions.entity';

@Injectable()
export class WorksRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly worksService: WorksService,
    private readonly sitesService: SitesService,
    private readonly contractorsService: ContractorsService,
  ) {}

  worksRouter = this.trpc.router({
    get: this.trpc.authentificatedProcedure
      .input(z.object({
        ids: z.array(z.string()).optional(),
        site_ids: z.array(z.string()).optional()
      }))
      .query(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            ids,
            site_ids,
          } = input;

          const getWorks = await this.worksService
            .getAllByOrganizationIdAndOptions(
              user.organizationId,
              {
                siteIds: site_ids,
                ids: ids,
              }
            )

          return getWorks;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    create: this.trpc.authentificatedProcedure
      .input(z.object({
        site_id: z.string(),
        name: z.string(),
        start_date: z.string().optional().nullable(),
        end_date: z.string().optional().nullable(),
        type: z.nativeEnum(WorkType),
        description: z.string().optional(),
        interventions: z.object({
          name: z.string(),
          start_date: z.string().optional().nullable(),
          end_date: z.string().optional().nullable(),
          contractor: z.object({
            id: z.string().optional(),
            name: z.string().optional(),
          }),
          intervention_payments: z.object({
            payment_date: z.string().optional().nullable(),
            amount_ht: z.number().optional(),
            amount_ttc: z.number().optional(),
            intervention_payment_conditions: z.object({
              condition: z.string()
            }).array().optional()
          }).array().optional(),
        }).array().optional()
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;

          const siteAttachedToWork = await this.sitesService
            .getSiteById(input.site_id)

          if (siteAttachedToWork.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const work = new Work();
          work.siteId = input.site_id;
          work.name = input.name;
          work.start_date = new Date(input.start_date);
          work.end_date = new Date(input.end_date);
          work.type = input.type;
          work.description = input.description;

          work.interventions = await Promise.all(input.interventions.map(async interventionInput => {
            const intervention = new Intervention();

            if (interventionInput.contractor.id) {
              const contractor = await this.contractorsService.getContractorById(interventionInput.contractor.id);

              if (contractor.organizationId !== user.organizationId) {
                return null
              } else {
                intervention.contractorId = interventionInput.contractor.id
              }
            } else if (interventionInput.contractor.name) {
              const newContractor = new Contractor();
              newContractor.name = interventionInput.contractor.name;
              intervention.contractor = newContractor;
            }

            intervention.name = interventionInput.name;
            intervention.start_date = new Date(interventionInput.start_date);
            intervention.end_date = new Date(interventionInput.end_date);

            intervention.intervention_payments = interventionInput.intervention_payments.map(interventionPaymentInput => {
              const interventionPayment = new InterventionPayment();

              interventionPayment.payment_date = new Date(interventionPaymentInput.payment_date);
              interventionPayment.amount_ht = interventionPaymentInput.amount_ht;
              interventionPayment.amount_ttc = interventionPaymentInput.amount_ttc;

              interventionPayment.intervention_payment_conditions = interventionPaymentInput.intervention_payment_conditions.map(interventionPaymentConditionInput => {
                const interventionPaymentCondition = new InterventionPaymentCondition();

                interventionPaymentCondition.condition = interventionPaymentConditionInput.condition;
                return interventionPaymentCondition;
              })

              return interventionPayment;
            })

            return intervention;
          }));

          console.log(work)

          const workSaved = await this.worksService.createWork(work);

          return workSaved;

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
            name
          } = input;

          const getWork = await this.worksService
            .getWorkWithSiteById(id)

          if (getWork.site.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          if (!!name) {
            getWork.name = name;
          }

          const workEdited = await this.worksService.editWork(getWork);

          return workEdited;

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

          const getWork = await this.worksService
            .getWorkWithSiteById(id)

          if (getWork.site.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const workDeleted = await this.worksService.deleteWorkById(id);

          return workDeleted;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type WorksRouterType = WorksRouter[`worksRouter`];