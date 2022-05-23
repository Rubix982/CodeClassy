import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { Student } from './student.entity';

@Entity()
export class QuizAssignment {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ type: 'date' })
  dueDate: string;

  @Column()
  quizID: string;

  @Column()
  studentEmail: string;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizID' })
  quiz: Quiz;

  @ManyToOne(() => Student, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'studentEmail' })
  students: Student;
}
