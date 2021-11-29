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

  @ManyToOne(() => Classroom, (classroom) => classroom.sections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  classroom: Classroom;

  @ManyToOne(() => Teacher, (teacher) => teacher.sections)
  @JoinColumn()
  teacher: Teacher;

  @ManyToMany(() => Student, (student) => student.sections, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'section_students' })
  students: Student[];
}
