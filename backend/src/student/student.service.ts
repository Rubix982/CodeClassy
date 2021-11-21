import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { Student } from 'src/entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) readonly studentRepository: Repository<Student>,
  ) {}

  async createStudent(__member: Member) {
    const student = new Student();
    student.member = __member;
    await this.studentRepository.save(student);
  }
}
