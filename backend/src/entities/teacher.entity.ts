import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Classroom } from './classroom.entity';
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
}
