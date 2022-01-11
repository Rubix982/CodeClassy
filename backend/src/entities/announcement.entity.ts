import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnnouncementComment } from './announcement-comment.entity';
import { Member } from './member.entity';
import { Section } from './section.entity';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  sectionID: string;

  @ManyToOne(() => Section, (section) => section.announcements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sectionID' })
  section: Section;

  @OneToMany(
    () => AnnouncementComment,
    (announcementComment) => announcementComment.announcement,
  )
  comments: AnnouncementComment[];

  @Column()
  contentBody: string;

  @CreateDateColumn()
  creationDate: Date;
}
