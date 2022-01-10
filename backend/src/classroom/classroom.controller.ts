import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { Classroom } from 'src/entities/classroom.entity';
import { CreateSectionDTO } from 'src/section/create.dto';
import { SectionService } from 'src/section/section.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { ClassroomService } from './classroom.service';
import { ClassroomOwnerGuard } from './classroom-owner.guard';
import { AppGuard } from '../app/app.guard';

@UseGuards(AppGuard)
@Controller('classroom')
export class ClassroomController {
  constructor(
    private readonly classroomService: ClassroomService,
    private readonly teacherService: TeacherService,
    private readonly sectionService: SectionService,
  ) {}

  @UseGuards(ClassroomOwnerGuard)
  @Get(':id')
  async getClassroom(@Param('id') __classroomID: string) {
    const classroom: Classroom =
      await this.classroomService.getClassroomWithSections(__classroomID);
    return classroom;
  }

  @Delete(':id')
  async deleteClassroom(@Param('id') __classroomID: string) {
    await this.classroomService.deleteClassroom(__classroomID);
    return {
      msg: `Successfully deleted classroom: ${__classroomID}`,
      classroomID: __classroomID,
    };
  }

  @UseGuards(ClassroomOwnerGuard)
  @Get(':id/people')
  async getClassroomPeople(@Param('id') __classroomID: string) {
    const classroomData: Classroom =
      await this.classroomService.getClassroomWithSections(__classroomID);

    return await this.classroomService.getClassroomPeopleInformation(
      classroomData,
    );
  }

  @UseGuards(ClassroomOwnerGuard)
  @Post(':id/section')
  async createSection(
    @Body() __requestBody: CreateSectionDTO,
    @Param('id') __classroomID: string,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const classroom = await this.classroomService.getClassroom(__classroomID);
    const teacher = await this.teacherService.findTeacher(
      __requestBody.assignedTo,
    );
    await this.sectionService.createSection(classroom, teacher, __requestBody);

    return {
      msg: `Successfully assigned section: ${__requestBody.name} to ${__requestBody.assignedTo}`,
    };
  }
}
