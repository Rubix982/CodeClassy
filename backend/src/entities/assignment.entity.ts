import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { CodingQuestion } from './coding-question.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => CodingQuestion, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'codingQuestionID' })
  codingQuestion: CodingQuestion;

  @ManyToOne(() => Teacher, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacherID' })
  createdBy: Teacher;
}
