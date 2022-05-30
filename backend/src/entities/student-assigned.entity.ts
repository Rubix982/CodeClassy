import { Student } from 'src/entities/student.entity';
import { AssignmentResult } from './assignment-result.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class StudentAssigned {
  @PrimaryColumn({ type: 'int' })
  @ManyToOne(
    () => AssignmentResult,
    (assignmentResult) => assignmentResult.id,
    {
      nullable: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn()
  assignmentResult!: AssignmentResult;

  @PrimaryColumn({ type: 'int' })
  @ManyToOne(() => Student, (student) => student.email, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT',
  })
  @JoinColumn()
  student!: Student;
}
