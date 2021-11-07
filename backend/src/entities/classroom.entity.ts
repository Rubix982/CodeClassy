import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  name: string;

  @Column()
  description: string;
}
