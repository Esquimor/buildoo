import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';
import { TRPCError } from '@trpc/server';
import { string, z } from 'zod';
import { ContractorsService } from './contractors.service';
import { Contractor } from './contractors.entity';
import { ContractorType } from '@shared-type';
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
          priceHT: z.number(),
          priceTTC: z.number(),
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
          contractor.price_ht = input.priceHT;
          contractor.price_ttc = input.priceTTC;
          contractor.decennial_civil_liability = input.decennial_civil_liability;

          contractor.contractorPayments = input.contractorPayment.map(inputContractPayment => {
            const contractorPayment = new ContractorPayment();

            contractorPayment.amount_ht = inputContractPayment.amountHT;
            contractorPayment.amount_ttc = inputContractPayment.amountTTC;
            contractorPayment.date_payment = inputContractPayment.datePayment;

            return contractorPayment;
          })

          const contractorSaved = await this.contractorsService.createAContractor(contractor);
          return contractorSaved
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