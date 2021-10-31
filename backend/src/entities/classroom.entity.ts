import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Member } from './member.entity';

export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  @ManyToOne(() => Member, (member) => member.email)
  createdBy: Member;

  @Column()
  name: string;

  @Column()
  description: string;
}
