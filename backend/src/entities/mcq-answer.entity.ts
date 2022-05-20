import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class MCQAnswer {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('json')
  body: string;

  @Column()
  isCorrect: boolean;

  @Column()
  questionID: string;

  @ManyToOne(() => Question, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionID' })
  question: Question;
}
