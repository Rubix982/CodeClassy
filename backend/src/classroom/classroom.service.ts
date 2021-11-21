import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classroom.entity';
import { TeacherService } from 'src/teacher/teacher.service';
import { Repository } from 'typeorm';
import { CreateClassroomDTO } from './create.dto';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    private readonly teacherService: TeacherService,
  ) {}
  async createClassroom(
    __teacherEmail: string,
    __requestBody: CreateClassroomDTO,
  ) {
    const teacher = await this.teacherService.findTeacher(__teacherEmail);

    const classroom = this.classroomRepository.create({
      name: __requestBody.name,
      description: __requestBody.description,
      createdBy: teacher,
    });

    await this.classroomRepository.save(classroom);
  }
}
