import { Injectable } from '@nestjs/common';
import { InterventionPaymentCondition } from './intervention_payment_conditions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InterventionPaymentConditionsService {
    
  constructor(
    @InjectRepository(InterventionPaymentCondition)
    private contractorsRepository: Repository<InterventionPaymentCondition>,
  ) {}

  async getInterventionPaymentConditionById(idInteventionPaymentCondition: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idInteventionPaymentCondition
      }
    })
  }

  async getInterventionPaymentConditionWithInventionPaymentWithInterventionWithContractorById(idInteventionPaymentCondition: string) {
    return await this.contractorsRepository.findOne({
      where: {
        id: idInteventionPaymentCondition
      },
      relations: [
        "intervention_payment",
        "intervention_payment.intervention",
        "intervention_payment.intervention.contractor",
      ]
    })
  }

  async createInterventionPaymentCondition(inteventionPaymentCondition: InterventionPaymentCondition) {
    return await this.contractorsRepository.save(inteventionPaymentCondition)
  }

  async editInterventionPaymentCondition(inteventionPaymentCondition: InterventionPaymentCondition) {
    return await this.contractorsRepository.save(inteventionPaymentCondition)
  }

  async deleteInterventionPaymentConditionById(idInteventionPaymentCondition: string) {
    return await this.contractorsRepository.delete(idInteventionPaymentCondition)
  }
}
