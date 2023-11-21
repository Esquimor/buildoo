import { Project } from '@server/projects/projects.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

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

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[];
}
