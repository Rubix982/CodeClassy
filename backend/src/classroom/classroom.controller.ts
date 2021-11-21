import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { ClassroomGuard } from './classroom.guard';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDTO } from './create.dto';

@UseGuards(ClassroomGuard)
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  async createClassroom(
    @Body() __requestBody: CreateClassroomDTO,
    @RequestDecodedMember() __teacher: JWTPayload,
  ) {
    await this.classroomService.createClassroom(__teacher.email, __requestBody);
    return { msg: `Successfully created classroom: ${__requestBody.name}` };
  }
}
