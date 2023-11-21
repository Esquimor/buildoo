import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StashsModule } from '@server/stashs/stashs.module';
import { ContractorsModule } from '@server/contractors/contractors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    StashsModule,
    ContractorsModule
  ],
  providers: [ProjectsService],
  exports: [ProjectsService, TypeOrmModule.forFeature([Project])]
})
export class ProjectsModule {}
