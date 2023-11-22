import { Contractor } from '@server/contractors/contractors.entity';
import { Organization } from '@server/organization/organization.entity';
import { Stash } from '@server/stashs/stashs.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Organization, (organization) => organization.projects)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({ nullable: true })
  organizationId: string;

  @OneToMany(() => Stash, stash => stash.project)
  stashs: Stash[]

  @OneToMany(() => Contractor, contractor => contractor.project)
  contractors: Contractor[]
}
