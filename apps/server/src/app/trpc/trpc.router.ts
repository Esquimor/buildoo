import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService, createTRPCContext } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UsersRouter } from '@server/app/trpc/users.router';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersRouter: UsersRouter,
  ) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello ${name ? name : `Bilbo`}`,
        };
      }),
    users: this.usersRouter.userRouter
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

export type AppRouter = TrpcRouter[`appRouter`];