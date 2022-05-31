import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { QuizAssignment } from './quiz-assignment.entity';
import { Student } from './student.entity';

@Entity()
@Unique(['quizAssignment'])
export class QuizResult {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'date' })
  submittedAt: Date;

  @Column()
  obtainedPoints: number;

  @Column()
  totalPoints: number;

  @Column()
  studentEmail: string;

  @Column()
  quizAssignmentID: string;

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentEmail' })
  student: Student;

  @OneToOne(() => QuizAssignment)
  @JoinColumn({ name: 'quizAssignmentID' })
  quizAssignment: QuizAssignment;
}
