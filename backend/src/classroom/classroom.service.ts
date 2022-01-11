import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Classroom } from 'src/entities/classroom.entity';
import { Teacher } from 'src/entities/teacher.entity';
import { MemberService } from 'src/member/member.service';
import { Repository } from 'typeorm';
import { ClassroomRequestDTO } from './classroom.dto';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    private readonly memberService: MemberService,
  ) {}
  async createClassroom(
    __teacher: Teacher,
    __requestBody: ClassroomRequestDTO,
  ) {
    const classroom = this.classroomRepository.create({
      name: __requestBody.name,
      description: __requestBody.description,
      owner: __teacher,
    });

    await this.classroomRepository.save(classroom);
    return classroom.ID;
  }

  async getClassroom(__classroomID: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne(__classroomID);
    return classroom;
  }

  async getClassroomWithSections(__classroomID: string): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne(__classroomID, {
      relations: ['sections'],
    });
    return classroom;
  }

  async deleteClassroom(__classroomID: string) {
    await this.classroomRepository.delete(__classroomID);
  }

  async updateClassroomInformation(
    __classroomID: string,
    __requestBody: ClassroomRequestDTO,
  ) {
    const classroom = await this.getClassroom(__classroomID);

    if (classroom) {
      classroom.name = __requestBody.name;
      classroom.description = __requestBody.description;
    } else {
      throw new NotFoundException([
        'Could not find classroom with specified ID',
      ]);
    }
    return await this.classroomRepository.save(classroom);
  }

  async getClassroomPeopleInformation(__classroomData: Classroom) {
    let emails = [];

    emails.push(__classroomData.createdBy);

    for (
      var iterator = 0;
      iterator < __classroomData.sections.length;
      ++iterator
    ) {
      emails.push(__classroomData.sections[iterator].teacherEmail);
    }

    return await this.memberService.findAllRecordsWithEmails(emails);
  }
}
