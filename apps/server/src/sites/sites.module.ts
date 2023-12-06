import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Site } from "./sites.entity";
import { SitesRouter } from "./sites.router";
import { SitesService } from "./sites.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Site]),
  ],
  controllers: [],
  providers: [SitesService, SitesRouter],
  exports: [
    TypeOrmModule.forFeature([Site]),
    SitesService,
    SitesRouter,
  ]
})
export class SitesModule {}
