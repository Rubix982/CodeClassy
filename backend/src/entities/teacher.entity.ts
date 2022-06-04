import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Assignment } from './assignment.entity';
import { Category } from './category.entity';
import { Classroom } from './classroom.entity';
import { CodingQuestion } from './coding-question.entity';
import { Member } from './member.entity';
import { Section } from './section.entity';

@Entity()
export class Teacher {
  @PrimaryColumn()
  email: string;

  @OneToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  member: Member;

  @OneToMany(() => Classroom, (classroom) => classroom.owner)
  classrooms: Classroom[];

  @OneToMany(() => Section, (section) => section.teacher)
  sections: Section[];

  @OneToMany(() => Category, (category) => category.owner)
  categories: Category[];

  @OneToMany(
    (type) => CodingQuestion,
    (codingQuestion) => codingQuestion.createdBy,
    {
      cascade: true,
    },
  )
  codingQuestion: CodingQuestion[];

  @OneToMany((type) => Assignment, (assignment) => assignment.createdBy, {
    cascade: true,
  })
  assignment: Assignment[];
}
