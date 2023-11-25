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

  async findOne(projectId: string, organizationId: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: {
        id: projectId,
        organizationId
      },
    });
    return project;
  }

  async findOneWithContractors(projectId: string, organizationId: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({
      where: {
        id: projectId,
        organizationId
      },
      relations: ["contractors", "contractors.contractorPayments",  "contractors.contractorPayments.contractorPaymentConditions"]
    });
    return project;
  }

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
