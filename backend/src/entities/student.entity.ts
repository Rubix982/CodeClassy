import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';
import { Member } from './member.entity';
import { Section } from './section.entity';
import { StudentAssigned } from './student-assigned.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  email: string;

  @OneToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  member: Member;

  @ManyToOne(
    () => StudentAssigned,
    (studentAssigned) => studentAssigned.students,
  )
  studentAssignedResult: StudentAssigned;

  @ManyToMany(() => Section, (section) => section.students, {
    onDelete: 'CASCADE',
  })
  sections: Section[];
}
