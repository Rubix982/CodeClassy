import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AnnouncementService } from 'src/announcement/announcement.service';
import { AppGuard } from 'src/app/app.guard';
import { AddAnnouncementDTO } from './add-announcement.dto';
import { AddStudentDTO } from './add-student.dto';
import { SectionTeacherGuard } from './section-teacher.guard';
import { SectionService } from './section.service';

@UseGuards(AppGuard)
@Controller('section')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private readonly announcementService: AnnouncementService,
  ) {}

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

  @UseGuards(SectionTeacherGuard)
  @Post(':id/announcement')
  @UseInterceptors(FilesInterceptor('files'))
  async addSectionAnnouncement(
    @Param('id') __sectionID: string,
    @UploadedFiles() __files: Array<Express.Multer.File>,
    @Body() __requestBody: AddAnnouncementDTO,
  ) {
    console.log(__files);
    const section = await this.sectionService.getSection(__sectionID);
    const announcementID = await this.announcementService.createAnnouncement(
      section,
      __requestBody,
    );

    return {
      msg: `Successfully added announcement`,
      ID: announcementID,
    };
  }
}
