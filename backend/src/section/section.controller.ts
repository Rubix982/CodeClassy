import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { AddStudentDTO } from './add-student.dto';
import { SectionTeacherGuard } from './section-teacher.guard';
import { SectionService } from './section.service';

@UseGuards(AppGuard)
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @UseGuards(SectionTeacherGuard)
  @Post(':id/student')
  async addSectionMember(
    @Param('id') __sectionID: string,
    @Body() __requestBody: AddStudentDTO,
  ) {
    await this.sectionService.addSectionMember(
      __sectionID,
      __requestBody.email,
    );
    return {
      msg: `Successfully added ${__requestBody.email}`,
    };
  }
}
