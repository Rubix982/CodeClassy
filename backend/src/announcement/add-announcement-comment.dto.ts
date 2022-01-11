import { IsString } from 'class-validator';
import { AnnouncementComment } from 'src/entities/announcement-comment.entity';

export class AddAnnouncementCommentRequestDTO {
  @IsString()
  contentBody: string;
}

export class AddAnnouncementCommentResponseDTO {
  readonly ID: string;
  readonly commentatorEmail: string;
  readonly contentBody: string;
  readonly creationDate: Date;

  constructor(__announcementComment: AnnouncementComment) {
    this.ID = __announcementComment.ID;
    this.commentatorEmail = __announcementComment.commentatorEmail;
    this.contentBody = __announcementComment.contentBody;
    this.creationDate = __announcementComment.creationDate;
  }
}
