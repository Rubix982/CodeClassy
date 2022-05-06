import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Announcement } from './announcement.entity';
import { Member } from './member.entity';

@Entity()
export class AnnouncementComment {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  announcementID: string;

  @Column()
  commentatorEmail: string;

  @ManyToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentatorEmail' })
  commentator: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'announcementID' })
  announcement: Announcement;

  @Column()
  contentBody: string;

  @CreateDateColumn()
  creationDate: Date;
}
