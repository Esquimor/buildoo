import { Intervention } from '@server/interventions/interventions.entity';
import { Site } from '@server/sites/sites.entity';
import { Entity, Column, PrimaryGeneratedColumn,  OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Site, site => site.works)
  @JoinColumn({ name: "siteId" })
  site: Site;

  @Column({ nullable: true })
  siteId: string;

  @OneToMany(() => Intervention, intervention => intervention.work)
  interventions: Intervention[];
}
