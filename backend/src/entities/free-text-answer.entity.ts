import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class FreeTextAnswer {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column('json')
  body: string;

  @Column()
  questionID: string;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;
}
