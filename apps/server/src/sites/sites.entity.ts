import { Organization } from '@server/organization/organization.entity';
import { Work } from '@server/works/works.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Site {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Work, work => work.site)
  works: Work[];

  @ManyToOne(() => Organization, organization => organization.sites)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({ nullable: true })
  organizationId: string;
}
