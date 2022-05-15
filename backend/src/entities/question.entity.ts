import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Teacher } from './teacher.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('json')
  body: string;

  @Column()
  categoryID: string;

  @Column()
  createdBy: string;

  @Column()
  points: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryID' })
  category: Category;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'createdBy' })
  teacher: Teacher;
}
