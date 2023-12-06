import { Injectable } from '@nestjs/common';
import { TrpcService } from '../app/trpc/trpc.service';

@Injectable()
export class AddressesRouter {
  constructor(
    private readonly trpc: TrpcService
  ) {}

  addressesRouter = this.trpc.router({
  });
}

export type AddressesRouterType = AddressesRouter[`addressesRouter`];