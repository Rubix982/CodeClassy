import { Assignment } from './assignment.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { TestCase } from './test-case.entity';

@Entity()
export class CodingQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @OneToMany(() => TestCase, (testCase) => testCase.codingQuestion)
  testCases: TestCase[];

  @ManyToMany(() => Assignment, assignment => assignment.codingQuestions)
  assignments: Assignment[];
}
