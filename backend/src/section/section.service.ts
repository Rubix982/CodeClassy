import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classroom.entity';
import { Section } from 'src/entities/section.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager, Repository } from 'typeorm';
import { SectionRequestDTO } from './section.dto';
import { GetSectionDTO } from './get-section.dto';

@Injectable()
export class SectionService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
    private readonly JSONQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }
  async createSection(
    __classroom: Classroom,
    __teacher: Teacher,
    __requestBody: SectionRequestDTO,
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
        throw new ConflictException([
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

  async getSectionData(__sectionID: string) {
    const queryString: string = this.JSONQueryExtractorService.getQueryByID(6);
    const [data] = await this.entityManager.query(queryString, [
      __sectionID,
      __sectionID,
      __sectionID,
    ]);
    return new GetSectionDTO(data);
  }

  async addSectionMember(__sectionID: string, __studentEmail: string) {
    try {
      const query = this.JSONQueryExtractorService.getQueryByID(7);

      await this.entityManager.query(query, [__studentEmail, __sectionID]);
    } catch (error) {
      if (error.errno === 1062) {
        throw new ConflictException([
          `${__studentEmail} is already part of the section`,
        ]);
      }
      if (error.errno === 1452) {
        throw new NotFoundException([
          `${__studentEmail} is not a registered student email`,
        ]);
      }
    }
  }

  async deleteSection(__sectionID: string) {
    await this.sectionRepository.delete(__sectionID);
  }

  async updateSectionInformation(
    __section: Section,
    __requestBody: SectionRequestDTO,
  ) {
    try {
      __section.name = __requestBody.name;
      __section.teacherEmail = __requestBody.assignedTo;
      return await this.sectionRepository.save(__section);
    } catch (error) {
      let errorString: string = '';
      if (error.errno === 1062) {
        errorString = `Section already present with name: ${__requestBody.name}`;
      } else if (error.errno === 1452) {
        errorString = `Provided teacher email is invalid: ${__requestBody.assignedTo}`;
      }
      throw new ConflictException([errorString]);
    }
  }
}
