import { Project } from "@server/projects/projects.entity";
import { User } from "@server/users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
  
  @OneToMany(() => Project, project => project.organization)
  projects: Project[]
  
  @OneToMany(() => User, user => user.organization)
  users: User[]
}
