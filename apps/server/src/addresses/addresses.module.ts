import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Address } from "./addresses.entity";
import { AddressesRouter } from "./addresses.router";
import { AddressesService } from "./addresses.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
  ],
  controllers: [],
  providers: [AddressesService, AddressesRouter],
  exports: [
    TypeOrmModule.forFeature([Address]),
    AddressesService,
    AddressesRouter,
  ]
})
export class AddressesModule {}
