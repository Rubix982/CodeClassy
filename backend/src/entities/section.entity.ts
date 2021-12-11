import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Announcement } from './announcement.entity';
import { Classroom } from './classroom.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';

@Entity()
@Unique(['classroom', 'name'])
export class Section {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  name: string;

  @Column()
  classroomID: string;

  @Column()
  teacherEmail: string;

  @ManyToOne(() => Classroom, (classroom) => classroom.sections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'classroomID' })
  classroom: Classroom;

  @ManyToOne(() => Teacher, (teacher) => teacher.sections)
  @JoinColumn({ name: 'teacherEmail' })
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.sections, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'section_students' })
  students: Student[];

  @OneToMany(() => Announcement, (announcement) => announcement.section)
  announcements: Announcement[];
}
