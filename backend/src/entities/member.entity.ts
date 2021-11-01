import { Column, Entity, PrimaryColumn } from 'typeorm';

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
