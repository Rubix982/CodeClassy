import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AnnouncementCommentRequestDTO,
  AnnouncementCommentResponseDTO,
} from 'src/announcement/announcement-comment.dto';
import { AnnouncementComment } from 'src/entities/announcement-comment.entity';
import { Announcement } from 'src/entities/announcement.entity';
import EntityTransformer from 'src/helper/EntityTransformer';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementCommentService {
  constructor(
    @InjectRepository(AnnouncementComment)
    private readonly announcementCommentRepository: Repository<AnnouncementComment>,
  ) {}

  public async createAnnouncementComment(
    __announcement: Announcement,
    __commentatorEmail: string,
    __requestBody: AnnouncementCommentRequestDTO,
  ) {
    const announcementComment = this.announcementCommentRepository.create({
      announcement: __announcement,
      commentatorEmail: __commentatorEmail,
      contentBody: __requestBody.contentBody,
    });
    await this.announcementCommentRepository.save(announcementComment);

    const entityTransformer = new EntityTransformer<
      AnnouncementComment,
      AnnouncementCommentResponseDTO
    >(AnnouncementCommentResponseDTO);
    return entityTransformer.fromEntity(announcementComment);
  }

  public async getAnnouncementComment(__annoucementCommentID: string) {
    const announcementComment =
      await this.announcementCommentRepository.findOne(__annoucementCommentID);
    return announcementComment;
  }

  public async updateAnnouncementComment(
    __annoucementComment: AnnouncementComment,
    __requestBody: AnnouncementCommentRequestDTO,
  ) {
    __annoucementComment.contentBody = __requestBody.contentBody;
    return await this.announcementCommentRepository.save(__annoucementComment);
  }

  public async deleteAnnouncementComment(__annoucementCommentID: string) {
    await this.announcementCommentRepository.delete(__annoucementCommentID);
  }

  public async getAnnouncementComments(__announcementID: string) {
    const announcementComments = await this.announcementCommentRepository
      .createQueryBuilder('announcement_comment')
      .where('announcementID = :announcementID', {
        announcementID: __announcementID,
      })
      .orderBy('creationDate', 'DESC')
      .execute();

    if (announcementComments) {
      return announcementComments;
    } else {
      return {};
    }
  }
}
