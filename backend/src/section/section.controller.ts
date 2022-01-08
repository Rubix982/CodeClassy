import {
  Body,
  Controller,
  Get,
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
import { SectionMemberGuard } from './section-member.guard';
import { SectionService } from './section.service';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { JWTPayload } from 'src/auth/signin.dto';

@UseGuards(AppGuard)
@Controller('section')
export class SectionController {
  constructor(
    private readonly sectionService: SectionService,
    private readonly announcementService: AnnouncementService,
  ) {}

  @UseGuards(SectionMemberGuard)
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

  @UseGuards(SectionMemberGuard)
  @Post(':id/announcement')
  @UseInterceptors(FilesInterceptor('files'))
  async addSectionAnnouncement(
    @Param('id') __sectionID: string,
    @UploadedFiles() __files: Array<Express.Multer.File>,
    @RequestDecodedMember() __member: JWTPayload,
    @Body() __requestBody: AddAnnouncementDTO,
  ) {
    const section = await this.sectionService.getSection(__sectionID);
    const announcement = await this.announcementService.createAnnouncement(
      section,
      __requestBody,
      __member,
    );

    return {
      msg: `Successfully added announcement`,
      ID: announcement.ID,
      announcement: announcement,
    };
  }

  @UseGuards(SectionMemberGuard)
  @Get(':id')
  async getSectionInformation(@Param('id') __sectionID: string) {
    const response = await this.sectionService.getSection(__sectionID);

    const result = await this.sectionService.getTeacherData(response.teacherEmail);

    if (response && result) {
      return {
        teacherData: result,
        response: response,
        msg: `Section successfully loaded!`,
      };
    } else {
      return {};
    }
  }

  @UseGuards(SectionMemberGuard)
  @Get(':id/announcement')
  async getSectionAnnouncements(@Param('id') __sectionID: string) {
    const announcements =
      await this.announcementService.getAnnouncementForSection(__sectionID);

    if (announcements) {
      return {
        msg: 'Announcements successfully retrieved',
        announcements: announcements,
      };
    }
  }

  @UseGuards(SectionMemberGuard)
  @Get(':id/people')
  async getSectionMembers(@Param('id') __sectionID: string) {
    const people = await this.sectionService.getSectionWithStudents(
      __sectionID,
    );

    if (people) {
      return people;
    } else {
      return {};
    }
  }
}
