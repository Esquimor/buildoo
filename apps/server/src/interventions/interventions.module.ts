import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Intervention } from "./interventions.entity";
import { InterventionsRouter } from "./interventions.router";
import { InterventionsService } from "./interventions.service";
import { WorksModule } from "@server/works/works.module";
import { ContractorsModule } from "@server/contractors/contractors.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention]),
    WorksModule,
    ContractorsModule
  ],
  controllers: [],
  providers: [InterventionsService, InterventionsRouter],
  exports: [
    TypeOrmModule.forFeature([Intervention]),
    InterventionsService,
    InterventionsRouter,
  ]
})
export class InterventionsModule {}
