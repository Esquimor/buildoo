import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Contractor } from './contractors.entity';
import { ContractorPaymentCondition } from './contractors_payment_condition.entity';

@Entity()
export class ContractorPayment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date_payment: string;

  @Column()
  amount_ht: number;

  @Column()
  amount_ttc: number;

  @ManyToOne(() => Contractor, contractor => contractor.contractorPayments)
  contractor: Contractor;

  @OneToMany(() => ContractorPaymentCondition, contractorPaymentCondition => contractorPaymentCondition.contractorPayment)
  contractorPaymentConditions: ContractorPaymentCondition[]
}
