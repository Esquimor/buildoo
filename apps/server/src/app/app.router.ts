import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService, createTRPCContext } from './trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UsersRouter } from '@server/users/users.router';
import { AuthRouter } from '@server/auth/auth.router';

@Injectable()
export class AppRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersRouter: UsersRouter,
    private readonly authRouter: AuthRouter,
  ) {}

  appRouter = this.trpc.router({
    users: this.usersRouter.userRouter,
    auth: this.authRouter.authRouter,
  });

  applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext: createTRPCContext
      }),
    );
  }
}

export type AppRouterType = AppRouter[`appRouter`];