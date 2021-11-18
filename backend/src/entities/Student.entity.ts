import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Student {
  @OneToOne(() => Member, { primary: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'memberEmail' })
  member: Member;
}
