import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { ContractorsService } from './contractors.service';
import { Contractor } from './contractors.entity';
import { ContractorPaymentStatus, ContractorType } from '@shared-type';
import { ContractorPayment } from './contractors_payment.entity';
import { ProjectsService } from '@server/projects/projects.service';

@Injectable()
export class ContractorsRouter {
  constructor(
    private readonly contractorsService: ContractorsService,
    private readonly projectsService: ProjectsService,
    private readonly trpc: TrpcService
  ) {}

  contractorRouter = this.trpc.router({
    create: this.trpc.authentificatedProcedure
      .input(
        z.object({
          projectId: z.string(),
          name: z.string().min(1),
          type: z.string().min(1),
          decennial_civil_liability: z.string(),
          contractorPayment: z.array(z.object({
            amountHT: z.number(),
            amountTTC: z.number(),
            datePayment: z.string(),
            contractorPaymentCondition: z.array(z.object({
              condition: z.string()
            })).optional()
          }))
        }),
      )
      .mutation(async ({ input, ctx }) => {

        const { user } = ctx;

        try {
          const project = await this.projectsService.findOne(input.projectId, user.organizationId);

          if (!project) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "NO_PROJECT_FOUND",
            });
          }

          const contractor = new Contractor();

          contractor.project = project

          contractor.name = input.name;
          contractor.type = input.type as ContractorType;
          contractor.decennial_civil_liability = input.decennial_civil_liability;

          contractor.contractorPayments = input.contractorPayment.map(inputContractPayment => {
            const contractorPayment = new ContractorPayment();

            contractorPayment.amount_ht = inputContractPayment.amountHT;
            contractorPayment.amount_ttc = inputContractPayment.amountTTC;
            contractorPayment.date_payment = inputContractPayment.datePayment;

            return contractorPayment;
          });

          const contractorSaved = await this.contractorsService.createAContractor(contractor);
          return contractorSaved
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
      edit: this.trpc.authentificatedProcedure
        .input(
          z.object({
            id: z.string(),
            name: z.string().min(1),
            type: z.string().min(1),
          }),
        )
        .mutation(async ({ input, ctx }) => {

          const { user } = ctx;

          try {
            const contractor = await this.contractorsService
              .getContractorByIdAndOrganizationId(input.id, user.organizationId);

            if (!contractor) {
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "NO_PROJECT_FOUND",
              });
            }

            contractor.name = input.name;
            contractor.type = input.type as ContractorType;

            const contractorSaved = await this.contractorsService.editContractor(contractor);
            return contractorSaved
          } catch (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: (error as Error).message,
            });
          }
        }),
      addPayment: this.trpc.authentificatedProcedure
        .input(
          z.object({
            contractorId: z.string(),
            amountHT: z.number(),
            amountTTC: z.number(),
            datePayment: z.string(),
            contractorPaymentCondition: z.array(z.object({
              condition: z.string()
            })).optional()
          }))
        .mutation(async ({ ctx, input }) => {
          const { user } = ctx;

          const contractor = await this.contractorsService
            .getContractorByIdAndOrganizationId(input.contractorId, user.organizationId);

          if (!contractor) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Not_Found",
            });
          }
          
          const contractorPayment = new ContractorPayment();

          contractorPayment.amount_ht = input.amountHT;
          contractorPayment.amount_ttc = input.amountTTC;
          contractorPayment.date_payment = input.datePayment;
          contractorPayment.contractorId = contractor.id;

          const contractorPaymentSaved = await this.contractorsService
            .createAContractorPayment(contractorPayment);

          return contractorPaymentSaved;
        }),  
      editPayment: this.trpc.authentificatedProcedure
        .input(z.object({
          id: z.string(),
          date_payment: z.string().optional(),
          amount_ht: z.number().optional(),
          amount_ttc: z.number().optional(),
          status: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
          const { user } = ctx;

          const contractorPayment = await this.contractorsService
            .getContractorPaymentByIdAndOrganizationId(input.id, user.organizationId);

          if (!contractorPayment) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Not_Found",
            });
          }

          if (input.date_payment) {
            contractorPayment.date_payment = input.date_payment;
          }
          if (input.amount_ht) {
            contractorPayment.amount_ht = input.amount_ht;
          }
          if (input.amount_ttc) {
            contractorPayment.amount_ttc = input.amount_ttc
          };
          if (input.status) {
            contractorPayment.status = input.status as ContractorPaymentStatus
          }

          const paymentSaved = await this.contractorsService
            .updatePayment(contractorPayment);

          return paymentSaved;
        }),
      deletePayment: this.trpc.authentificatedProcedure
        .input(z.object({
          id: z.string(),
        }))
        .mutation(async ({ ctx, input }) => {
          
          const { user } = ctx;

          const contractorPayment = await this.contractorsService
            .getContractorPaymentByIdAndOrganizationId(input.id, user.organizationId);

          if (!contractorPayment) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Not_Found",
            });
          }

          try {
            await this.contractorsService.deletePayment(input.id)
            return true;
          } catch (error) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: (error as Error).message,
            });
          }
        })
  });
}

export type ContractorsRouterType = ContractorsRouter[`contractorRouter`];