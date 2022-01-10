import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
@Unique(['owner', 'name'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  createdBy: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.categories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'createdBy' })
  owner: Teacher;

  @Column()
  name: string;
}
