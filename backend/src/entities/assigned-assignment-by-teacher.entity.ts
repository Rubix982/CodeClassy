import { Teacher } from 'src/entities/teacher.entity';
import { Student } from 'src/entities/student.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { AssignedAssignment } from './assigned-assignment.entity';

@Entity()
export class AssignedAssignmentByTeacher {
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
  assignedAssignmentByTeacherID!: AssignedAssignment;

  @PrimaryColumn({ type: 'int' })
  @ManyToOne(() => Teacher, (teacher) => teacher.email, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  student!: Student;
}
