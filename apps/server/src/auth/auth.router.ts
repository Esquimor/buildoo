import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { TrpcService } from '../app/trpc/trpc.service';
import { TRPCError } from '@trpc/server';
import { AuthService } from './auth.service';

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly authService: AuthService,
  ) {}

  authRouter = this.trpc.router({
    login: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
          password: z.string(),
        }),
      )
      .mutation(async ({ input }) => {
        const { email, password } = input;
        try {
          const token = await this.authService.signIn(email, password);
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
    register: this.trpc.procedure
      .input(
        z.object({
          email: z.string(),
          password: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { email, password } = input;
        
        try {
          const isAdded = await this.authService.register(email, password);

          if (isAdded) {
            return true
          } else {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR"
            })
          }
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: (error as Error).message,
          });
        }
      })
  });
}

export type AuthRouterType = AuthRouter[`authRouter`];