import { Student } from 'src/entities/student.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { AssignedAssignment } from './assigned-assignment.entity';

@Entity()
export class AssignedAssignmentByStudent {
  @ManyToOne(() => AssignedAssignment, {
    primary: true,
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  assignedAssignment: AssignedAssignment;

  @ManyToOne(() => Student, {
    primary: true,
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  student: Student;
}
