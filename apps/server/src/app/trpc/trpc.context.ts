import { User } from '@server/users/user.entity';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';

interface CreateInnerContextOptions extends CreateExpressContextOptions {
  user: User | null;
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