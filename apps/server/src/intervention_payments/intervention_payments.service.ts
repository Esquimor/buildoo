import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterventionPayment } from './intervention_payments.entity';

@Injectable()
export class InterventionPaymentsService {
    
  constructor(
    @InjectRepository(InterventionPayment)
    private contractorsRepository: Repository<InterventionPayment>,
  ) {}

  async getInterventionPaymentById(idInteventionPayment: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idInteventionPayment
      }
    })
  }

  async getInterventionPaymentWithInterventionWithContractorById(idInteventionPayment: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idInteventionPayment
      },
      relations: ["intervention", "intervention.contractor"]
    })
  }

  async createInterventionPayment(inteventionPayment: InterventionPayment) {
    return await this.contractorsRepository.save(inteventionPayment)
  }

  async editInterventionPayment(inteventionPayment: InterventionPayment) {
    return await this.contractorsRepository.save(inteventionPayment)
  }

  async deleteInterventionPaymentById(idInteventionPayment: string) {
    return await this.contractorsRepository.delete(idInteventionPayment)
  }
}
