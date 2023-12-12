import { Injectable } from '@nestjs/common';
import { AuthService } from '@server/auth/auth.service';
import { UsersService } from '@server/users/users.service';
import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './trpc.context';

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


  /**
   * I didn't find any way to correctly put a middleware in an other function and use it.
   * 
   * The type are check incorrectly.
   * So I will let that here.
   * 
   * And hope Trpc had a better way to handle it in the futur.
   */
  isAuthentificated = this.trpc.middleware(async ({ ctx, next }) => {
    const { req } = ctx;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const decodedToken = await this.authService.decodeToken(token);

    const user = await this.userService.findByIdWithOrganization(decodedToken.data);


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