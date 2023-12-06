import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, In, Repository } from 'typeorm';
import { Work } from './works.entity';

@Injectable()
export class WorksService {
    
  constructor(
    @InjectRepository(Work)
    private contractorsRepository: Repository<Work>,
  ) {}

  async getWorkById(idWork: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idWork
      }
    })
  }

  async getWorkWithSiteById(idWork: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idWork
      },
      relations: ["site"]
    })
  }

  async getAllByOrganizationIdAndOptions(
    idOrganization: string,
    options: {
      siteIds?: string[];
    }
  ) {

    let where: {
      site: {
        organizationId: string;
        id?: FindOperator<string>
      }
    } = {
      site: {
        organizationId: idOrganization,
      }
    };

    if (!!options.siteIds) {
      where = {
        ...where,
        site: {
          ...where.site,
          id: In(options.siteIds)
        }
      }
    }

    return await this.contractorsRepository.find({
      where: where as FindOptionsWhere<Work>
    })
  }

  async createWork(intevention: Work) {
    return await this.contractorsRepository.save(intevention)
  }

  async editWork(intevention: Work) {
    return await this.contractorsRepository.save(intevention)
  }

  async deleteWorkById(idIntevention: string) {
    return await this.contractorsRepository.delete(idIntevention)
  }
}
