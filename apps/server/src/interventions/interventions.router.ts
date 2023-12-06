import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { z } from 'zod';
import { InterventionsService } from './interventions.service';
import { TRPCError } from '@trpc/server';
import { WorksService } from '@server/works/works.service';
import { ContractorsService } from '@server/contractors/contractors.service';
import { Intervention } from './interventions.entity';

@Injectable()
export class InterventionsRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly interventionsService: InterventionsService,
    private readonly contractorsService: ContractorsService,
    private readonly worksService: WorksService,
  ) {}

  interventionsRouter = this.trpc.router({
    get: this.trpc.authentificatedProcedure
      .input(z.object({
        work_ids: z.array(z.string()).optional(),
        contractor_ids: z.array(z.string()).optional(),
      }))
      .query(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            work_ids,
            contractor_ids
          } = input;

          const getInterventions = await this.interventionsService
            .getAllByOrganizationIdAndOptions(
              user.organizationId,
              {
                work_ids: work_ids,
                contractor_ids: contractor_ids,
              }
            )

          return getInterventions;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    create: this.trpc.authentificatedProcedure
      .input(z.object({
        work_id: z.string(),
        contractor_id: z.string(),
        name: z.string(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            work_id,
            contractor_id,
            name
          } = input;

          const workAttachedToIntervention = await this.worksService
            .getWorkWithSiteById(work_id)

          if (workAttachedToIntervention.site.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const contractorAttachedToIntervention = await this.contractorsService
            .getContractorById(contractor_id)

          if (contractorAttachedToIntervention.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const intervention = new Intervention();
          intervention.workId = work_id;
          intervention.contractorId = contractor_id;
          intervention.name = name;

          const interventionSaved = await this.interventionsService.createIntervention(intervention);

          return interventionSaved;

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

          const getIntervention = await this.interventionsService
            .getInterventionWithContractorById(id);

          if (getIntervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          if (!!name) {
            getIntervention.name = name
          }

          const interventionEdited = await this.interventionsService.editIntervention(getIntervention);

          return interventionEdited;

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

          const getIntervention = await this.interventionsService
            .getInterventionWithContractorById(id);

          if (getIntervention.contractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "",
            });
          }

          const interventionDeleted = await this.interventionsService.deleteInterventionById(id);

          return interventionDeleted;

        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type InterventionsRouterType = InterventionsRouter[`interventionsRouter`];