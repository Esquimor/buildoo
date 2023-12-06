import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stash {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;
}
