import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column()
  sectionID: string;

  @ManyToOne(() => Section, (section) => section.announcements)
  @JoinColumn({ name: 'sectionID' })
  section: Section;

  @Column()
  contentBody: string;

  @CreateDateColumn()
  creationDate: Date;
}
