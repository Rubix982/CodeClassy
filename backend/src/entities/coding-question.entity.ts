import { Assignment } from './assignment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TestCase } from './test-case.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class CodingQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => Teacher, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacherID' })
  createdBy: Teacher;
}
