import { Organization } from '@server/organization/organization.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({
    nullable: true
  })
  firstName: string;

  @Column({
    nullable: true
  })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Organization, (organization) => organization.users)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;

  @Column({ nullable: true })
  organizationId: string;
}
