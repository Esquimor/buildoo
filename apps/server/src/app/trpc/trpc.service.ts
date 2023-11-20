import { Injectable } from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { UsersService } from '@server/users/users.service';
import { TRPCError, initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

interface CreateInnerContextOptions extends CreateExpressContextOptions {
  user: {
    id: string;
  } | null;
}

export const createTRPCContext = (_opts: CreateInnerContextOptions) => {
  const { req, res, user } = _opts;
  return {
    req,
    res,
    user
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

@Injectable()
export class TrpcService {

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  trpc = initTRPC.context<Context>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;

  isAuthentificated = this.trpc.middleware(async ({ ctx, next }) => {
    const { req } = ctx;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const decodedToken = await this.authService.decodeToken(token);

    const user = await this.userService.findById(decodedToken.id);

    if (!user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next({
      ctx: {
        ...ctx,
        user,
      },
    });
  });

  authentificatedProcedure = this.trpc.procedure.use(this.isAuthentificated);
}