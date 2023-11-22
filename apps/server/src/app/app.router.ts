import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService, createTRPCContext } from './trpc/trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UsersRouter } from '@server/users/users.router';
import { AuthRouter } from '@server/auth/auth.router';
import { ProjectsRouter } from '@server/projects/projects.router';

@Injectable()
export class AppRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersRouter: UsersRouter,
    private readonly authRouter: AuthRouter,
    private readonly projectRouter: ProjectsRouter,
  ) {}

  appRouter = this.trpc.router({
    user: this.usersRouter.userRouter,
    auth: this.authRouter.authRouter,
    project: this.projectRouter.projectRouter,
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