import { Body, Controller, Param, Post } from '@nestjs/common';
import { AddStudentDTO } from './add-student.dto';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}
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
