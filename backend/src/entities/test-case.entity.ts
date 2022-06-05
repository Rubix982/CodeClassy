import { CodingQuestion } from './coding-question.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TestCase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  in: string;

  @Column()
  out: string;

  @ManyToOne(() => CodingQuestion, {
    onDelete: 'CASCADE',
  })
  codingQuestion: CodingQuestion;
}
