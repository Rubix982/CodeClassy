import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from 'src/entities/student.entity';
import { Assignment } from './assignment.entity';

@Entity()
export class AssignedAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dueDate;

  @Column()
  sessionID: string;

  @OneToOne(() => Assignment, (assignment) => assignment)
  @JoinColumn()
  assignment: Assignment;

  @ManyToMany(() => Student)
  @JoinTable()
  students: Student[];
}
