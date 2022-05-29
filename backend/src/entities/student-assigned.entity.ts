import { Student } from 'src/entities/student.entity';
import { AssignmentResult } from './assignment-result.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class StudentAssigned {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({ type: 'int', name: 'assignmentResult_id' })
  @ManyToOne(
    () => AssignmentResult,
    (assignmentResult) => assignmentResult.id,
    {
      primary: true,
      nullable: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn()
  assignmentResult!: AssignmentResult;

  @PrimaryColumn({ type: 'int', name: 'student_id' })
  @ManyToOne(() => Student, (student) => student.email, {
    primary: true,
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  student!: Student;
}
