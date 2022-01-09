import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
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

  @OneToMany(() => Announcement, (announcement) => announcement.announcer)
  announced: Announcement[];

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