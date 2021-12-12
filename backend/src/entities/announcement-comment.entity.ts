import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Announcement } from './announcement.entity';

@Entity()
export class AnnouncementComment {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  announcementID: string;

  @Column()
  commentatorFullName: string;

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
