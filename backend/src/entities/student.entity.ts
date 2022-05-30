import { AssignedAssignmentByStudent } from './assigned-assginment-by-student.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Member } from './member.entity';
import { Section } from './section.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  email: string;

  @OneToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  member: Member;

  @OneToMany(
    () => AssignedAssignmentByStudent,
    (assignedAssignmentByStudent) =>
      assignedAssignmentByStudent.student,
  )
  student: AssignedAssignmentByStudent[];

  @ManyToMany(() => Section, (section) => section.students, {
    onDelete: 'CASCADE',
  })
  sections: Section[];
}
