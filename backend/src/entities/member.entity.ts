import { Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Classroom } from './classroom.entity';

export class Member {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  profilePictureLink: string;

  @Column()
  role: string;

  @OneToMany(() => Classroom, (classroom) => classroom.createdBy)
  classrooms: Classroom[];
}
