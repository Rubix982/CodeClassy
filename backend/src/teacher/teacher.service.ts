import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager, Repository } from 'typeorm';

@Injectable()
export class TeacherService {
  private readonly entityManager: EntityManager;
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    private readonly JSONQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

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
    const query = this.JSONQueryExtractorService.getQueryByID(3);
    const classrooms = await this.entityManager.query(query, [__teacherEmail]);

    return classrooms;
  }

  async getSections(__teacherEmail: string) {
    const query = this.JSONQueryExtractorService.getQueryByID(4);
    const sections = await this.entityManager.query(query, [__teacherEmail]);

    return sections;
  }
}
