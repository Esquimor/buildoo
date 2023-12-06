import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService, createTRPCContext } from './trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UsersRouter } from '@server/users/users.router';
import { AuthRouter } from '@server/auth/auth.router';
import { ContractorsRouter } from '@server/contractors/contractors.router';
import { InterventionPaymentConditionsRouter } from '@server/intervention_payment_conditions/intervention_payment_conditions.router';
import { InterventionPaymentsRouter } from '@server/intervention_payments/intervention_payments.router';
import { InterventionsRouter } from '@server/interventions/interventions.router';
import { SitesRouter } from '@server/sites/sites.router';
import { WorksRouter } from '@server/works/works.router';

@Injectable()
export class AppRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersRouter: UsersRouter,
    private readonly authRouter: AuthRouter,
    private readonly contractorRouter: ContractorsRouter,
    private readonly interventionPaymentConditionsRouter: InterventionPaymentConditionsRouter,
    private readonly interventionPaymentRouter: InterventionPaymentsRouter,
    private readonly interventionRouter: InterventionsRouter,
    private readonly siteRouter: SitesRouter,
    private readonly workRouter: WorksRouter,
  ) {}

  appRouter = this.trpc.router({
    user: this.usersRouter.userRouter,
    auth: this.authRouter.authRouter,
    contractor: this.contractorRouter.contractorRouter,
    interventionPaymentCondition: this.interventionPaymentConditionsRouter.interventionPaymentConditionsRouter,
    interventionPayment: this.interventionPaymentRouter.interventionPaymentsRouter,
    intervention: this.interventionRouter.interventionsRouter,
    site: this.siteRouter.sitesRouter,
    work: this.workRouter.worksRouter,
  });

  applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: createTRPCContext,
      }),
    );
  }
}

export type AppRouterType = AppRouter[`appRouter`];