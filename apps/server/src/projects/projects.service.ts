import { Injectable } from '@nestjs/common';
import { Project } from './projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findAllByOrganizationId(organizationId: string): Promise<Project[]> {
    const projects = await this.projectsRepository.findBy({
      organizationId
    })

    return projects;
  }

  async createAProject(project: { name: string, organizationId: string }): Promise<Project> {
    const projectCreated = await this.projectsRepository.save(project);

    return projectCreated
  }
}
