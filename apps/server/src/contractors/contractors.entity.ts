import { Project } from '@server/projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ContractorPayment } from './contractors_payment.entity';

@Entity()
export class Contractor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Project, project => project.contractors)
  project: Project;

  @OneToMany(() => ContractorPayment, contractorPayment => contractorPayment.contractor)
  contractorPayments: ContractorPayment[]
}
