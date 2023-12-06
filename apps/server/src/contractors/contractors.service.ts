import { Injectable } from '@nestjs/common';
import { Contractor } from './contractors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContractorsService {
    
  constructor(
    @InjectRepository(Contractor)
    private contractorsRepository: Repository<Contractor>,
  ) {}

  async createContractor(contractor: Contractor) {
    const contractorSaved = await this.contractorsRepository.save(contractor)
    return contractorSaved
  }

  async editContractor(contractor: Contractor) {
    const contractorSaved = await this.contractorsRepository.save(contractor)
    return contractorSaved
  }

  async getContractorById(idContractor: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idContractor
      },
    })
  }

  async getAllContractorByOrganizationId(idOrganization: string) {
    return await this.contractorsRepository.findOne({
      where: {
        organizationId: idOrganization
      },
    })
  }

  async deleteContractorById(idContractor: string) {
    return await this.contractorsRepository.delete(idContractor)
  }
}
