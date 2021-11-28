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
}
