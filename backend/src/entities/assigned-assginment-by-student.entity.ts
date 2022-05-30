import { Student } from 'src/entities/student.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { AssignedAssignment } from './assigned-assignment.entity';

@Entity()
export class AssignedAssignmentByStudent {
  @PrimaryColumn({ type: 'int' })
  @ManyToOne(
    () => AssignedAssignment,
    (assignedAssignment) => assignedAssignment.id,
    {
      nullable: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn()
  assignedAssignmentByStudentID!: AssignedAssignment;

  @PrimaryColumn({ type: 'int' })
  @ManyToOne(() => Student, (student) => student.email, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  student!: Student;
}
