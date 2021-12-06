import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(__member: Member) {
    const student = new Student();
    student.member = __member;
    await this.studentRepository.save(student);
  }

  async getStudent(__studentEmail: string) {
    const student = await this.studentRepository.findOne(__studentEmail);

    if (student) {
      return student;
    } else {
      throw new NotFoundException([
        `Could not find student with email: ${__studentEmail}`,
      ]);
    }
  }

  async getAllSectionsByStudentEmail(__studentEmail: string) {
    const studentSectionsData = await this.studentRepository
      .createQueryBuilder('student')
      .leftJoin('student.sections', 'section')
      .leftJoin('section.classroom', 'classroom')
      .leftJoin('section.teacher', 'teacher')
      .leftJoin('teacher.member', 'member')
      .select([
        'section.id as sectionID',
        'section.name as sectionName',
        'classroom.name AS classroomName',
        'classroom.description AS classroomDescription',
        'member.fullName AS teacherFullName',
      ])
      .where('student.email=:email', { email: __studentEmail })
      .getRawMany();
    return studentSectionsData;
  }
}
