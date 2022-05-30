import { AssignedAssignmentByStudent } from './assigned-assginment-by-student.entity';
import { AssignedAssignmentByTeacher } from './assigned-assignment-by-teacher.entity';
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

  @OneToOne(() => Assignment, (assignment) => assignment)
  @JoinColumn()
  assignment: Assignment;

  @OneToMany(
    () => AssignedAssignmentByStudent,
    (assignedAssignmentByStudent) =>
      assignedAssignmentByStudent.assignedAssignmentByStudentID,
  )
  assignedAssignmentByStudent: AssignedAssignmentByStudent[];

  @OneToMany(
    () => AssignedAssignmentByTeacher,
    (assignedAssignmentByTeacher) =>
      assignedAssignmentByTeacher.assignedAssignmentByTeacherID,
  )
  assignedAssignmentByTeacher: AssignedAssignmentByTeacher[];
}
