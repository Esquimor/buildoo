import { InterventionPaymentCondition } from '@server/intervention_payment_conditions/intervention_payment_conditions.entity';
import { Intervention } from '@server/interventions/interventions.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class InterventionPayment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Intervention, intervention => intervention.intervention_payments)
  @JoinColumn({ name: "interventionId" })
  intervention: Intervention;

  @Column({ nullable: true })
  interventionId: string;

  @OneToMany(() => InterventionPaymentCondition, intervention_payment_condition => intervention_payment_condition.intervention_payment)
  intervention_payment_conditions: InterventionPaymentCondition[];
}
