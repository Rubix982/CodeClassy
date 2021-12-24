import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { Student } from 'src/entities/student.entity';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly JSONQueryExtractorService: JSONQueryExtractorService,
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
    const query = this.JSONQueryExtractorService.getQueryByID(2);
    const entityManager = getManager();
    const studentSectionsData = await entityManager.query(query, [
      __studentEmail,
    ]);

    return studentSectionsData;
  }
}
