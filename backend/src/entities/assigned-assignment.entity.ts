import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assignment } from './assignment.entity';
import { AssignmentResult } from './assignment-results.entity';

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
}
