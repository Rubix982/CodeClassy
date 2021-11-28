import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classroom.entity';
import { Section } from 'src/entities/section.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateSectionDTO } from './create.dto';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private readonly sectionRepository: Repository<Section>,
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
      throw new BadRequestException([
        `Section already present with name: ${__requestBody.name}`,
      ]);
    }
  }
}
