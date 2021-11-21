import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Classroom } from './classroom.entity';
import { Member } from './member.entity';

@Entity()
export class Teacher {
  @PrimaryColumn()
  email: string;

  @OneToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  member: Member;

  @OneToMany(() => Classroom, (classroom) => classroom.createdBy)
  classrooms: Classroom[];
}
