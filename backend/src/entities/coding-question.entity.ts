import { Assignment } from './assignment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
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

  @OneToMany(() => TestCase, (testCase) => testCase.codingQuestion)
  testCases: TestCase[];

  @OneToMany(() => Assignment, (assignment) => assignment.codingQuestion)
  assignments: Assignment[];

  @ManyToOne(() => Teacher, (Teacher) => Teacher.codingQuestion)
  createdBy: Teacher;
}
