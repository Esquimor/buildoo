import { InterventionPayment } from '@server/intervention_payments/intervention_payments.entity';
import { Intervention } from '@server/interventions/interventions.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class InterventionPaymentCondition {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    default: ""
  })
  condition: string;

  @Column({
    default: false
  })
  completed: boolean;

  @ManyToOne(() => InterventionPayment, intervention_payment => intervention_payment.intervention_payment_conditions)
  @JoinColumn({ name: "interventionPaymentId" })
  intervention_payment: InterventionPayment;

  @Column({ nullable: true })
  interventionPaymentId: string;
}
