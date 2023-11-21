import { Contractor } from '@server/contractors/contractors.entity';
import { Stash } from '@server/stashs/stashs.entity';
import { User } from '@server/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  users: User[]

  @OneToMany(() => Stash, stash => stash.project)
  stashs: Stash[]

  @OneToMany(() => Contractor, contractor => contractor.project)
  contractors: Contractor[]
}
