import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Assignment } from './assignment.entity';

@Entity()
export class AssignedAssignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime')
  dueDate;

  @Column()
  sessionID: string;

  @Column('double')
  score;

  @OneToOne((type) => Assignment, (assignment) => assignment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  assignment: Assignment;
}
