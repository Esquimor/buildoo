import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './sites.entity';

@Injectable()
export class SitesService {
    
  constructor(
    @InjectRepository(Site)
    private contractorsRepository: Repository<Site>,
  ) {}

  async getSiteById(idIntevention: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idIntevention
      }
    })
  }

  async getAllByOrganizationId(idOrganization: string) {
    return await this.contractorsRepository.find({
      where: {
        organizationId: idOrganization,
      }
    })
  }

  async createSite(intevention: Site) {
    return await this.contractorsRepository.save(intevention)
  }

  async editSite(intevention: Site) {
    return await this.contractorsRepository.save(intevention)
  }

  async deleteSiteById(idIntevention: string) {
    return await this.contractorsRepository.delete(idIntevention)
  }
}
