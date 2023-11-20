import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { UsersService } from './users.service';
import { TrpcService } from '../app/trpc/trpc.service';
import { TRPCError } from '@trpc/server';
import jwt from "jsonwebtoken"

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
    secretPlace: this.trpc.adminProcedure
      .query(({ ctx}) => {

        return `Id: 123`
      }),
    login: this.trpc.procedure
      .input(
        z.object({
          name: z.string().optional(),
        }),
      )
      .mutation(async () => {
        try {
          const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
          return {
            token
          };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      }),
  });
}

export type UserRouter = UsersRouter[`userRouter`];