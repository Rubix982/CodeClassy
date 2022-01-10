import {
  Body,
  Controller,
  Delete,
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
  async getSectionData(@Param('id') __sectionID: string) {
    const sectionData = await this.sectionService.getSectionData(__sectionID);
    return sectionData;
  }

  @Delete(':id')
  async deleteSection(@Param('id') __sectionID: string) {
    await this.sectionService.deleteSection(__sectionID);
    return {
      msg: `Successfully deleted section: ${__sectionID}`,
      sectionID: __sectionID,
    };
  }
}
