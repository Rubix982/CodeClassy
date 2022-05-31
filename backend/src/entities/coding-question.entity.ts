import { Assignment } from './assignment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { TestCase } from './test-case.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class CodingQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @OneToMany((type) => TestCase, (testCase) => testCase.codingQuestion, {
    cascade: true,
  })
  testCases: TestCase[];

  @OneToMany((type) => Assignment, (assignment) => assignment.codingQuestion, {
    cascade: true,
  })
  assignments: Assignment[];

  @ManyToOne((type) => Teacher, (Teacher) => Teacher.codingQuestion, {
    onDelete: 'CASCADE',
  })
  createdBy: Teacher;
}
