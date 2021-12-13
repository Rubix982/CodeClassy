import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { AnnouncementCommentService } from 'src/announcement-comment/announcement-comment.service';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { AddAnnouncementCommentRequestDTO } from './add-announcement-comment.dto';
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
    @Body() __reqeustBody: AddAnnouncementCommentRequestDTO,
  ) {
    const announcement = await this.announcementService.getAnnouncement(
      __announcementID,
    );
    const announcementComment =
      await this.announcementCommentService.createAnnouncementComment(
        announcement,
        __member.fullName,
        __reqeustBody,
      );

    return {
      msg: 'Succesfully created announcement comment',
      announcementComment,
    };
  }
}
