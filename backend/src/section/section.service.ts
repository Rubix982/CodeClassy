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
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { MemberService } from 'src/member/member.service';
import { getManager, Repository } from 'typeorm';
import { CreateSectionDTO } from './create.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly memberService: MemberService,
    private readonly JSONQueryExtractorService: JSONQueryExtractorService,
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

    if (section) {
      return section;
    } else {
      throw new NotFoundException([`Could not find section: ${__sectionID}`]);
    }
  }

  async getSectionWithStudents(__sectionID: string) {
    const sectionInformation = await this.sectionRepository.findOne(
      __sectionID,
      { relations: ['students'] },
    );

    let memberInformation = {};

    if (sectionInformation.students.length !== 0) {
      let emails = [];

      for (var i = 0; i < sectionInformation.students.length; ++i) {
        emails.push(sectionInformation.students[i].email);
      }

      memberInformation = await this.memberService.findAllRecordsWithEmails(
        emails,
      );
    } else {
      memberInformation = [{}];
    }

    if (sectionInformation) {
      return {
        section: sectionInformation,
        members: memberInformation,
      };
    } else {
      throw new NotFoundException([`Could not find section: ${__sectionID}`]);
    }
  }

  async addSectionMember(__sectionID: string, __studentEmail: string) {
    try {
      const query = this.JSONQueryExtractorService.getQueryByID(7);

      const entityManager = getManager();

      await entityManager.query(query, [__studentEmail, __sectionID]);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException([
          `${__studentEmail} is already part of the section`,
        ]);
      }
    }
  }

  async getTeacherData(__teacherEmail: string) {
    try {
      const query = this.JSONQueryExtractorService.getQueryByID(6);

      const entityManager = getManager();

      return await entityManager.query(query, [__teacherEmail]);
    } catch(error) {
      throw new NotFoundException(`Could not find a teacher with email: ${__teacherEmail}`)
    }
  }
}
