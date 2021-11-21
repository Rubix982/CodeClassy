import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { Teacher } from 'src/entities/Teacher.entity';
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
}
