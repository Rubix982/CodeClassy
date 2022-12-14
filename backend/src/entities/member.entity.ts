import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { AnnouncementComment } from './announcement-comment.entity';
import { Announcement } from './announcement.entity';
import { MemberVerification } from './member-verification.entity';

@Entity()
export class Member {
  @PrimaryColumn()
  email: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToOne(() => MemberVerification, (verification) => verification.member)
  verification: MemberVerification;

  constructor(
    __email: string,
    __fullName: string,
    __password: string,
    __role: string,
  ) {
    this.email = __email;
    this.fullName = __fullName;
    this.password = __password;
    this.role = __role;
  }
}
