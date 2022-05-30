import { AssignedAssignmentByStudent } from './assigned-assginment-by-student.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assignment } from './assignment.entity';

@Entity()
export class AssignedAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('datetime')
  dueDate;

  @Column()
  sessionID: string;

  @Column('double')
  score;

  @OneToOne(() => Assignment, (assignment) => assignment)
  @JoinColumn()
  assignment: Assignment;

  @OneToMany(
    () => AssignedAssignmentByStudent,
    (assignedAssignmentByStudent) =>
      assignedAssignmentByStudent.assignedAssignment,
  )
  assignedAssignmentByStudent: AssignedAssignmentByStudent[];
}
