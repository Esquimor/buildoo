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

  async createAContractor(contractor: Contractor) {
    const contractorSaved = await this.contractorsRepository.save(contractor)
    return contractorSaved
  }
}
