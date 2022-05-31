import { AssignedAssignmentByStudent } from './assigned-assignment-by-student.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime')
  dueDate;

  @Column()
  sessionID: string;

  @Column('double')
  score;

  @OneToOne((type) => Assignment, (assignment) => assignment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  assignment: Assignment;

  @OneToMany(
    (type) => AssignedAssignmentByStudent,
    (assignedAssignmentByStudent) =>
      assignedAssignmentByStudent.assignedAssignment,
    {
      cascade: true,
    },
  )
  assignedAssignmentByStudent: AssignedAssignmentByStudent[];
}
