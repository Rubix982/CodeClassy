import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Classroom } from 'src/entities/classroom.entity';
import { ClassroomService } from './classroom.service';
import { GetClassroomGuard } from './get-classroom.guard';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @UseGuards(GetClassroomGuard)
  @Get(':id')
  async getClassroom(@Param('id') __classroomID: string) {
    const classroom: Classroom =
      await this.classroomService.getClassroomWithSections(__classroomID);
    return classroom;
  }
}
