import { Contractor } from '@server/contractors/contractors.entity';
import { InterventionPayment } from '@server/intervention_payments/intervention_payments.entity';
import { Work } from '@server/works/works.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Intervention {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Work, work => work.interventions)
  @JoinColumn({ name: "workId" })
  work: Work;

  @Column({ nullable: true })
  workId: string;

  @ManyToOne(() => Contractor, contractor => contractor.interventions)
  @JoinColumn({ name: "contractorId" })
  contractor: Contractor;

  @Column({ nullable: true })
  contractorId: string;

  @ManyToOne(() => Contractor, contractor => contractor.intervention_masters)
  @JoinColumn({ name: "contractorMasterId" })
  contractor_master: Contractor;

  @Column({ nullable: true })
  contractorMasterId: string;

  @OneToMany(() => InterventionPayment, intervention_payment => intervention_payment.intervention)
  intervention_payments: InterventionPayment[];
}
