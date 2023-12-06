import { Contractor } from "@server/contractors/contractors.entity";
import { Site } from "@server/sites/sites.entity";
import { User } from "@server/users/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;
  
  @OneToMany(() => Site, site => site.organization)
  sites: Site[]
  
  @OneToMany(() => User, user => user.organization)
  users: User[]
  
  @OneToMany(() => Contractor, contractor => contractor.organization)
  contractors: Contractor[]
}
