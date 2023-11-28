import { Injectable } from '@nestjs/common';
import { Contractor } from './contractors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractorPayment } from './contractors_payment.entity';

@Injectable()
export class ContractorsService {
    
  constructor(
    @InjectRepository(Contractor)
    private contractorsRepository: Repository<Contractor>,
    @InjectRepository(ContractorPayment)
    private contractorPaymentRepository: Repository<ContractorPayment>
  ) {}

  async createAContractor(contractor: Contractor) {
    const contractorSaved = await this.contractorsRepository.save(contractor)
    return contractorSaved
  }

  async getContractorPaymentByIdAndOrganizationId(paymentId: string, organizationId: string) {
    const contractorPayment = await this.contractorPaymentRepository.findOne({
      where: {
        id: paymentId,
        contractor: {
          project: {
            organizationId: organizationId
          }
        }
      },
    })
    return contractorPayment;
  }

  async updatePayment(contractorPayment: ContractorPayment) {
    const paymentSaved = await this.contractorPaymentRepository.save(contractorPayment);
    return paymentSaved;
  }

  async deletePayment(contractorPaymentId: string) {
    return await this.contractorPaymentRepository.delete(contractorPaymentId);
  }
}
