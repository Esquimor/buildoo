import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ContractorType } from "@shared-type"
import { Organization } from '@server/organization/organization.entity';
import { Intervention } from '@server/interventions/interventions.entity';

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

  @ManyToOne(() => Organization, organization => organization.contractors)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({ nullable: true })
  organizationId: string;

  @OneToMany(() => Intervention, intervention => intervention.contractor)
  interventions: Intervention[];

  @OneToMany(() => Intervention, intervention => intervention.contractor_master)
  intervention_masters: Intervention[];
}
