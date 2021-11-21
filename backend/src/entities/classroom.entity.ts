import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ nullable: false })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.classrooms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  createdBy: Teacher;
}
