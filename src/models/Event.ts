import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
export default class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  userId: number;
}
