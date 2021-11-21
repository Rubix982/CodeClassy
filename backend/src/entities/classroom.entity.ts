import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from './section.entity';
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

  @OneToMany(() => Section, (section) => section.classroom)
  sections: Section[];
}
