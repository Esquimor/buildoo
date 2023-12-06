import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, FindOptionsWhere, In, Repository } from 'typeorm';
import { Intervention } from './interventions.entity';

@Injectable()
export class InterventionsService {
    
  constructor(
    @InjectRepository(Intervention)
    private interventionsRepository: Repository<Intervention>,
  ) {}

  async getInterventionById(idIntevention: string) {
    return await this.interventionsRepository.findOne({
      where: {
        id: idIntevention
      }
    })
  }

  async getInterventionWithContractorById(idIntevention: string) {
    return await this.interventionsRepository.findOne({
      where: {
        id: idIntevention
      },
      relations: ["contractor"]
    })
  }

  async getAllByOrganizationIdAndOptions(
    idOrganization: string,
    options: {
      work_ids?: string[];
      contractor_ids?: string[]
    }
  ) {
    

    let where: {
      work?: {
        site: {
          organizationId: string;
        }
        id?: FindOperator<string>
      };
      contractor?: {
        organizationId: string;
        id?: FindOperator<string>
      }
    } = {
      contractor: {
        organizationId: idOrganization,
      }
    };

    if (!!options.work_ids) {
      where = {
        ...where,
        work: {
          ...where.work,
          id: In(options.work_ids),
          site: {
            ...where.work.site,
            organizationId: idOrganization
          }
        }
      }
    }

    if (!!options.contractor_ids) {
      where = {
        ...where,
        contractor: {
          id: In(options.contractor_ids),
          organizationId: idOrganization,
        }
      }
    }

    return await this.interventionsRepository.find({
      where: where as FindOptionsWhere<Intervention>
    })
  }

  async createIntervention(intevention: Intervention) {
    return await this.interventionsRepository.save(intevention)
  }

  async editIntervention(intevention: Intervention) {
    return await this.interventionsRepository.save(intevention)
  }

  async deleteInterventionById(idIntevention: string) {
    return await this.interventionsRepository.delete(idIntevention)
  }
}
