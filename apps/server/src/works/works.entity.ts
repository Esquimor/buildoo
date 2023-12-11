import { Intervention } from '@server/interventions/interventions.entity';
import { Site } from '@server/sites/sites.entity';
import { WorkType } from '@shared-type';
import { Entity, Column, PrimaryGeneratedColumn,  OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ type: "date", nullable: true })
  start_date: Date;

  @Column({ type: "date", nullable: true })
  end_date: Date;

  @Column({
    type: "enum",
    enum: WorkType,
    default: WorkType.Create
  })
  type: WorkType;

  @Column({ default: "" })
  description: string;

  @ManyToOne(() => Site, site => site.works)
  @JoinColumn({ name: "siteId" })
  site: Site;

  @Column({ nullable: true })
  siteId: string;

  @OneToMany(
    () => Intervention,
    intervention => intervention.work,
    {
      cascade: true
    }
  )
  interventions: Intervention[];
}
