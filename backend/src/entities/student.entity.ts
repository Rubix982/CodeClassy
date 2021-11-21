import { Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  email: string;

  @OneToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  member: Member;
}
