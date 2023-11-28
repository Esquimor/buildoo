import { Project } from '@server/projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ContractorPayment } from './contractors_payment.entity';
import { ContractorType, ContractorWorkStatus } from "@shared-type"

@Entity()
export class Contractor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: ContractorType,
    default: ContractorType.Unknow
  })
  type: ContractorType;

  @Column()
  decennial_civil_liability: string;

  @Column({
    type: "enum",
    enum: ContractorWorkStatus,
    default: ContractorWorkStatus.Unknow
  })
  work_status: ContractorWorkStatus;

  @ManyToOne(() => Project, project => project.contractors)
  project: Project;

  @OneToMany(() => ContractorPayment, contractorPayment => contractorPayment.contractor, {
    cascade: true
  })
  contractorPayments: ContractorPayment[];

  addContractorPayment(contractorPayment: ContractorPayment) {
    if (!this.contractorPayments || this.contractorPayments.length === 0) {
        this.contractorPayments = [contractorPayment]
        return; 
    }
    this.contractorPayments = [...this.contractorPayments, contractorPayment]
  }

  resetContractorPayments() {
    this.contractorPayments = [];
  }
}
