import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ContractorPayment } from './contractors_payment.entity';

@Entity()
export class ContractorPaymentCondition {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => ContractorPayment, contractorPayment => contractorPayment.contractorPaymentConditions)
  contractorPayment: ContractorPayment;
}
