import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { UsersService } from './users.service';
import { TrpcService } from '../app/trpc/trpc.service';

@Injectable()
export class UsersRouter {
  constructor(
    private readonly users: UsersService,
    private readonly trpc: TrpcService
  ) {}

  userRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .query(({ input }) => {
        const { name } = input;
        return {
          greeting: `Hello user ${name ? name : `Bilbo`}`,
        };
      }),
    secretPlace: this.trpc.authentificatedProcedure
      .query(({ ctx }) => {

        return `Id: ${ctx.user.id}`
      }),
  });
}

export type UserRouter = UsersRouter[`userRouter`];