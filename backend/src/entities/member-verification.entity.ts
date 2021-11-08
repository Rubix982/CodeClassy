import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MemberVerification {
  @PrimaryGeneratedColumn('uuid')
  ID: string;

  @Column({ default: false })
  status: boolean;

  @Column()
  hashString: string;
}
