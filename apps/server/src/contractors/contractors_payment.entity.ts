import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Contractor } from './contractors.entity';
import { ContractorPaymentCondition } from './contractors_payment_condition.entity';

@Entity()
export class ContractorPayment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Contractor, contractor => contractor.contractorPayments)
  contractor: Contractor;

  @OneToMany(() => ContractorPaymentCondition, contractorPaymentCondition => contractorPaymentCondition.contractorPayment)
  contractorPaymentConditions: ContractorPaymentCondition[]
}
