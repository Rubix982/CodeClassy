import { AssignedAssignmentByStudent } from './assigned-assginment-by-student.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Member } from './member.entity';
import { Section } from './section.entity';
import { StudentAssigned } from './student-assigned.entity';

@Entity()
export class Student {
  @PrimaryColumn()
  email: string;

  @OneToOne(() => Member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'email' })
  member: Member;

  @OneToMany(
    () => StudentAssigned,
    (studentAssigned) => studentAssigned.student,
  )
  studentAssigned: StudentAssigned[];

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
