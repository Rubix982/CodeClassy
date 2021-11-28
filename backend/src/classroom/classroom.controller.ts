import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
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
