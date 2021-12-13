import { IsString } from 'class-validator';
import { AnnouncementComment } from 'src/entities/announcement-comment.entity';

export class AddAnnouncementCommentRequestDTO {
  @IsString()
  contentBody: string;
}

export class AddAnnouncementCommentResponseDTO {
  readonly ID: string;
  readonly commentatorFullName: string;
  readonly contentBody: string;
  readonly creationDate: Date;

  constructor(__announcementComment: AnnouncementComment) {
    this.ID = __announcementComment.ID;
    this.commentatorFullName = __announcementComment.commentatorFullName;
    this.contentBody = __announcementComment.contentBody;
    this.creationDate = __announcementComment.creationDate;
  }
}
