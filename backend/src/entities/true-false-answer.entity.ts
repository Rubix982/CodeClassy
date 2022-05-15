import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class TrueFalseAnswer {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  correctChoice: boolean;

  @Column()
  questionID: string;

  @OneToOne(() => Question, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionID' })
  question: Question;
}
