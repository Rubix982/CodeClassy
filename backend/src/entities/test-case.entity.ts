import { CodingQuestion } from './coding-question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TestCase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  in: string;

  @Column()
  out: string;

  @ManyToOne(() => CodingQuestion, (codingQuestion) => codingQuestion.testCases)
  codingQuestion: CodingQuestion;
}
