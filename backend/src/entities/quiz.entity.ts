import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  name: string;

  @Column()
  createdBy: string;

  @Column()
  duration: number;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'createdBy' })
  teacher: Teacher;
}
