import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganizationService {
    
  constructor(
    @InjectRepository(Organization)
    private organizationsRepository: Repository<Organization>,
  ) {}

  async addOrganization(organization: { name: string; }) {
    const organizationAdded = await this.organizationsRepository.save(organization)
    return organizationAdded
  }
}
