import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JWTPayload } from 'src/auth/signin.dto';
import { ClassroomService } from 'src/classroom/classroom.service';
import { CreateClassroomDTO } from 'src/classroom/create.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { TeacherGuard } from './teacher.guard';
import { TeacherService } from './teacher.service';

@UseGuards(TeacherGuard)
@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly classroomService: ClassroomService,
  ) {}

  @Post('classroom')
  async createClassroom(
    @Body() __requestBody: CreateClassroomDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const teacher = await this.teacherService.findTeacher(__member.email);
    await this.classroomService.createClassroom(teacher, __requestBody);
    return { msg: `Successfully created classroom: ${__requestBody.name}` };
  }
}
