import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Classroom } from './classroom.entity';

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
}
