import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Classroom } from './classroom.entity';
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
}
