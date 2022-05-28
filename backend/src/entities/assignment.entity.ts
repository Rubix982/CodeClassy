import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CodingQuestion } from './coding-question.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('datetime')
  duration;

  @ManyToOne(
    () => CodingQuestion,
    (codingQuestion) => codingQuestion.assignments,
  )
  codingQuestion: CodingQuestion;
}
