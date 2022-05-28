import { StudentAssigned } from './student-assigned.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { AssignedAssignment } from './assigned-assignment.entity';

@Entity()
export class AssignmentResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('double')
  score;

  @OneToOne(() => AssignedAssignment)
  @JoinColumn()
  assignedAssignment: AssignedAssignment;

  @OneToMany(() => StudentAssigned, studentAssigned => studentAssigned.result)
  students: StudentAssigned[];
}
