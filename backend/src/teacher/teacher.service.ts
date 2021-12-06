import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) readonly teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacher(__member: Member) {
    const teacher = new Teacher();
    teacher.member = __member;
    await this.teacherRepository.save(teacher);
  }

  async findTeacher(__email: string) {
    try {
      const requestedTeacher = await this.teacherRepository.findOneOrFail(
        __email,
      );
      return requestedTeacher;
    } catch (error) {}
    throw new BadRequestException([
      'Could not find teacher with provided email',
    ]);
  }

  async getClassrooms(__teacherEmail: string) {
    const classrooms = this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoin('teacher.classrooms', 'classroom')
      .leftJoin('classroom.owner', 'classroomTeacher')
      .leftJoin('classroomTeacher.member', 'member')
      .select([
        'classroom.ID AS classroomID',
        'classroom.name AS classroomName',
        'classroom.description AS classroomDescription',
        'member.fullName AS teacherFullName',
      ])
      .where('teacher.email=:email', { email: __teacherEmail })
      .getRawMany();
    return classrooms;
  }

  async getSections(__teacherEmail: string) {
    const sections = await this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoin('teacher.sections', 'section')
      .leftJoin('section.classroom', 'classroom')
      .leftJoin('section.teacher', 'sectionTeacher')
      .leftJoin('sectionTeacher.member', 'member')
      .select([
        'section.id as sectionID',
        'section.name as sectionName',
        'classroom.name AS classroomName',
        'classroom.description AS classroomDescription',
        'member.fullName AS teacherFullName',
      ])
      .where('teacher.email=:email', { email: __teacherEmail })
      .getRawMany();
    return sections;
  }
}
