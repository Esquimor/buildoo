import { Module, forwardRef } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './projects.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StashsModule } from '@server/stashs/stashs.module';
import { ContractorsModule } from '@server/contractors/contractors.module';
import { ProjectsRouter } from './projects.router';
import { UsersModule } from '@server/users/users.module';
import { User } from '@server/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
    StashsModule,
    forwardRef(() => ContractorsModule),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ProjectsService, ProjectsRouter],
  exports: [ProjectsService, TypeOrmModule.forFeature([Project]), ProjectsRouter]
})
export class ProjectsModule {}
