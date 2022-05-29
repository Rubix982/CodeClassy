import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(
    () => StudentAssigned,
    (studentAssigned) => studentAssigned.student,
  )
  studentAssigned: StudentAssigned[];

  @ManyToMany(() => Section, (section) => section.students, {
    onDelete: 'CASCADE',
  })
  sections: Section[];
}
