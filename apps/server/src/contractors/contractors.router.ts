import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ContractorsService } from './contractors.service';
import { Contractor } from './contractors.entity';
import { ContractorType } from '@shared-type';

@Injectable()
export class ContractorsRouter {
  constructor(
    private readonly contractorsService: ContractorsService,
    private readonly trpc: TrpcService
  ) {}

  contractorRouter = this.trpc.router({
    get: this.trpc.authentificatedProcedure
      .input(z.object({
        ids: z.array(z.string()).optional(),
      }).optional())
      .query(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;

          const getContractors = await this.contractorsService
            .getAllContractorByOrganizationId(user.organizationId, input)

          return getContractors;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
    create: this.trpc.authentificatedProcedure
      .input(z.object({
        name: z.string(),
        type: z.string(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            name,
            type
          } = input

          const contractor = new Contractor();
          contractor.name = name;
          contractor.type = type as ContractorType;
          contractor.organizationId = user.organizationId

          const contractorSaved = await this.contractorsService.createContractor(contractor)

          return contractorSaved;
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
        type: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) =>  {
        try {
          const { user } = ctx;
          const {
            id,
            name,
            type
          } = input

          const getContractor = await this.contractorsService.getContractorById(id);

          if (getContractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "error",
            });
          }

          if (name)
            getContractor.name = name;

          if (type)
            getContractor.type = type as ContractorType;

          const contractorEdited = await this.contractorsService.editContractor(getContractor)

          return contractorEdited;
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
          } = input

          const getContractor = await this.contractorsService.getContractorById(id);

          if (getContractor.organizationId !== user.organizationId) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "error",
            });
          }

          const contractorDeleted = await this.contractorsService.deleteContractorById(id)

          return contractorDeleted;
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type ContractorsRouterType = ContractorsRouter[`contractorRouter`];