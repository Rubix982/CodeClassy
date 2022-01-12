import { Body, Controller, Param, Put } from '@nestjs/common';
import { AnnouncementCommentRequestDTO } from 'src/announcement/announcement-comment.dto';
import { AnnouncementCommentService } from './announcement-comment.service';

@Controller('announcement-comment')
export class AnnouncementCommentController {
  constructor(
    private readonly announcementCommentService: AnnouncementCommentService,
  ) {}

  @Put(':id')
  async updateAnnouncementComment(
    @Param('id') __announcementCommentID: string,
    @Body() __requestBody: AnnouncementCommentRequestDTO,
  ) {
    const announcementComment =
      await this.announcementCommentService.getAnnouncementComment(
        __announcementCommentID,
      );
    const updatedAnnouncementComment =
      await this.announcementCommentService.updateAnnouncementComment(
        announcementComment,
        __requestBody,
      );

    return {
      msg: `Successfully updated announcement comment: ${__announcementCommentID}`,
      announcementComment: updatedAnnouncementComment,
    };
  }
}
