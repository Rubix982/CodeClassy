import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AnnouncementCommentService } from 'src/announcement-comment/announcement-comment.service';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { AnnouncementRequestDTO } from 'src/section/announcement.dto';
import { AnnouncementCommentRequestDTO } from './announcement-comment.dto';
import { AnnouncementService } from './announcement.service';

@UseGuards(AppGuard)
@Controller('announcement')
export class AnnouncementController {
  constructor(
    private readonly announcementService: AnnouncementService,
    private readonly announcementCommentService: AnnouncementCommentService,
  ) {}

  @Post(':id/comment')
  async addAnnouncementCommment(
    @Param('id') __announcementID: string,
    @RequestDecodedMember() __member: JWTPayload,
    @Body() __reqeustBody: AnnouncementCommentRequestDTO,
  ) {
    const announcement = await this.announcementService.getAnnouncement(
      __announcementID,
    );
    const announcementComment =
      await this.announcementCommentService.createAnnouncementComment(
        announcement,
        __member.email,
        __reqeustBody,
      );

    return {
      msg: 'Succesfully created announcement comment',
      announcementComment,
    };
  }

  @Get(':id')
  async getAnnouncement(@Param('id') __announcementID: string) {
    const announcementData =
      await this.announcementService.getAnnouncementWithComments(
        __announcementID,
      );
    return announcementData;
  }

  @Delete(':id')
  async deleteAnnouncement(@Param('id') __announcementID: string) {
    await this.announcementService.deleteAnnouncement(__announcementID);
    return {
      msg: `Successfully deleted announcement: ${__announcementID}`,
      announcementID: __announcementID,
    };
  }

  @Put(':id')
  async updateAnnouncement(
    @Param('id') __announcementID: string,
    @Body() __requestBody: AnnouncementRequestDTO,
  ) {
    const announcement = await this.announcementService.getAnnouncement(
      __announcementID,
    );
    const updatedAnnouncement =
      await this.announcementService.updateAnnouncement(
        announcement,
        __requestBody,
      );

    return {
      msg: `Succesfully updated announcement: ${__announcementID}`,
      announcement: updatedAnnouncement,
    };
  }
}
