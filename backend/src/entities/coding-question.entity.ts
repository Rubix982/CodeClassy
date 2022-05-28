import { Assignment } from './assignment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TestCase } from './test-case.entity';

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
}
