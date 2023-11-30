import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Contractor } from './contractors.entity';
import { ContractorPaymentCondition } from './contractors_payment_condition.entity';
import { ContractorPaymentStatus } from '@shared-type';

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

  @Column({
    type: "enum",
    enum: ContractorPaymentStatus,
    default: ContractorPaymentStatus.Unknow
  })
  status: ContractorPaymentStatus;

  @ManyToOne(() => Contractor, contractor => contractor.contractorPayments)
  @JoinColumn({ name: "contractorId" })
  contractor: Contractor;

  @Column({ nullable: true })
  contractorId: string;

  @OneToMany(() => ContractorPaymentCondition, contractorPaymentCondition => contractorPaymentCondition.contractorPayment)
  contractorPaymentConditions: ContractorPaymentCondition[]
}
