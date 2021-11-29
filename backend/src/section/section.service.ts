import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classroom.entity';
import { Section } from 'src/entities/section.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { StudentService } from 'src/student/student.service';
import { Repository } from 'typeorm';
import { CreateSectionDTO } from './create.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly studentService: StudentService,
  ) {}
  async createSection(
    __classroom: Classroom,
    __teacher: Teacher,
    __requestBody: CreateSectionDTO,
  ) {
    try {
      const section = this.sectionRepository.create({
        name: __requestBody.name,
        classroom: __classroom,
        teacher: __teacher,
      });
      await this.sectionRepository.save(section);
    } catch (error) {
      if (error.errno === 1062) {
        throw new BadRequestException([
          `Section already present with name: ${__requestBody.name}`,
        ]);
      }
    }
  }

  async getSection(__sectionID: string) {
    const section = await this.sectionRepository.findOne(__sectionID);
    return section;
  }

  async getSectionWithStudents(__sectionID: string) {
    const sectionWithStudents = await this.sectionRepository.findOne(
      __sectionID,
      { relations: ['students'] },
    );

    if (sectionWithStudents) {
      return sectionWithStudents;
    } else {
      throw new NotFoundException([`Could not find section: ${__sectionID}`]);
    }
  }

  async addSectionMember(__sectionID: string, __studentEmail) {
    const section = await this.getSectionWithStudents(__sectionID);
    const student = await this.studentService.getStudent(__studentEmail);
    section.students = [...section.students, student];

    try {
      await this.sectionRepository.save(section);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException([
          `${__studentEmail} is already part of the section`,
        ]);
      }
    }
  }
}
