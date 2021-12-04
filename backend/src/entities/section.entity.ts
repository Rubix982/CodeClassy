import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
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
}
