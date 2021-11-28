import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classroom.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { Repository } from 'typeorm';
import { CreateClassroomDTO } from './create.dto';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}
  async createClassroom(__teacher: Teacher, __requestBody: CreateClassroomDTO) {
    const classroom = this.classroomRepository.create({
      name: __requestBody.name,
      description: __requestBody.description,
      createdBy: __teacher,
    });

    await this.classroomRepository.save(classroom);
  }
}
