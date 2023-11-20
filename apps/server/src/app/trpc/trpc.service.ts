import { Injectable } from '@nestjs/common';
import { TRPCError, initTRPC } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

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
  trpc = initTRPC.context<Context>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;

  isAdmin = this.trpc.middleware(async ({ ctx, next }) => {


    const { req } = ctx;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
      ctx: {
        user: {
          id: "1"
        },
      },
    });
  });

  adminProcedure = this.trpc.procedure.use(this.isAdmin);
   
  //adminProcedure = this.trpc.procedure.use(this.isAdmin);
}