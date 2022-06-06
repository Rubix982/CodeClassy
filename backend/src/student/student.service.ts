import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { Student } from 'src/entities/student.entity';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly JSONQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

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
    const studentSectionsData = await this.entityManager.query(query, [
      __studentEmail,
    ]);

    return studentSectionsData;
  }

  async getAllQuizzesByStudentEmail(__studentEmail: string) {
    const queryString = this.JSONQueryExtractorService.getQueryByID(16);
    const [quizzes] = await this.entityManager.query(queryString, [
      __studentEmail,
      __studentEmail,
      __studentEmail,
    ]);
    return quizzes;
  }
}
