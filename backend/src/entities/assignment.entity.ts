import { AssignedAssignment } from 'src/entities/assigned-assignment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
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

  @OneToOne(
    (type) => AssignedAssignment,
    (assignedAssignment) => assignedAssignment,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  assignedAssignment: AssignedAssignment;

  @ManyToOne(() => Teacher, (teacher) => teacher.assignment, {
    onDelete: 'CASCADE',
  })
  createdBy: Teacher;
}
