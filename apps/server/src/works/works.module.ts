import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Work } from "./works.entity";
import { WorksRouter } from "./works.router";
import { WorksService } from "./works.service";
import { SitesModule } from "@server/sites/sites.module";
import { ContractorsModule } from "@server/contractors/contractors.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Work]),
    SitesModule,
    ContractorsModule,
  ],
  controllers: [],
  providers: [WorksService, WorksRouter],
  exports: [
    TypeOrmModule.forFeature([Work]),
    WorksService,
    WorksRouter,
  ]
})
export class WorksModule {}
