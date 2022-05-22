import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
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

  @ManyToMany(() => Question)
  @JoinTable({
    name: 'quiz_questions',
  })
  questions: Question[];
}
