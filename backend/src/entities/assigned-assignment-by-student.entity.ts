import { Assignment } from 'src/entities/assignment.entity';
import { Student } from 'src/entities/student.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class AssignedAssignmentByStudent {
  @ManyToOne(() => Assignment, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  assignment: Assignment;

  @ManyToOne(() => Student, {
    primary: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  student: Student;
}
