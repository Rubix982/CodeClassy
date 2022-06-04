import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CodingQuestion } from './coding-question.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    (type) => CodingQuestion,
    (codingQuestion) => codingQuestion.assignments,
  )
  codingQuestion: CodingQuestion;

  @ManyToOne(() => Teacher, (teacher) => teacher.assignment, {
    onDelete: 'CASCADE',
  })
  createdBy: Teacher;
}
