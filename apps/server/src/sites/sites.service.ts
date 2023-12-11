import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, In, Repository } from 'typeorm';
import { Site } from './sites.entity';

@Injectable()
export class SitesService {
    
  constructor(
    @InjectRepository(Site)
    private sitesRepository: Repository<Site>,
  ) {}

  async getSiteById(idIntevention: string) {
    return await this.sitesRepository.findOne({
      where: {
        id: idIntevention
      }
    })
  }

  async getAllByOrganizationId(
    idOrganization: string,
    options?: {
      ids: string[]
    }
  ) {

    let where: {
      id?: FindOperator<string>;
      organizationId: string;
    } = {
      organizationId: idOrganization,
    };

    if (!!options.ids) {
      where = {
        ...where,
        id: In(options.ids)
      }
    }

    return await this.sitesRepository.find({
      where: where as FindOptionsWhere<Site>
    })
  }

  async createSite(intevention: Site) {
    return await this.sitesRepository.save(intevention)
  }

  async editSite(intevention: Site) {
    return await this.sitesRepository.save(intevention)
  }

  async deleteSiteById(idIntevention: string) {
    return await this.sitesRepository.delete(idIntevention)
  }
}
