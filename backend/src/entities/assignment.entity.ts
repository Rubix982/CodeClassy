import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { CodingQuestion } from './coding-question.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('datetime')
  duration;

  @ManyToMany(
    () => CodingQuestion,
    (codingQuestion) => codingQuestion.assignments,
  )
  codingQuestions: CodingQuestion[];
}
