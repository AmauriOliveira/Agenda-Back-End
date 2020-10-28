import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('events')
export default class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column('time with time zone')
  fromDate: Date;

  @Column('time with time zone')
  toDate: Date;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  provider: User;
}
