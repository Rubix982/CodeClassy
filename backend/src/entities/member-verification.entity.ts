import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class MemberVerification {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ default: false })
  status: boolean;

  @Column()
  hashString: string;

  @OneToOne(() => Member, (member) => member.verification, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'memberEmail' })
  member: Member;
}
