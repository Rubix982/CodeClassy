import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Teacher {
  @OneToOne(() => Member, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn()
  member: Member;
}
