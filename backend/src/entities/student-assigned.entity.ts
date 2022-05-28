import { Student } from 'src/entities/student.entity';
import { AssignmentResult } from './assignment-results.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class StudentAssigned {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => AssignmentResult,
    (assignmentResult) => assignmentResult.students,
  )
  result: AssignmentResult;

  @OneToMany(() => Student, (student) => student.studentAssignedResult)
  students: Student[];
}
