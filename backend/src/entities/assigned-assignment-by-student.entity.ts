import { Student } from 'src/entities/student.entity';
import { Entity, ManyToOne } from 'typeorm';
import { AssignedAssignment } from './assigned-assignment.entity';

@Entity()
export class AssignedAssignmentByStudent {
  @ManyToOne((type) => AssignedAssignment, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  assignedAssignment: AssignedAssignment;

  @ManyToOne((type) => Student, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  student: Student;
}
