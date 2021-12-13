import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddAnnouncementCommentRequestDTO,
  AddAnnouncementCommentResponseDTO,
} from 'src/announcement/add-announcement-comment.dto';
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
    __requestBody: AddAnnouncementCommentRequestDTO,
  ) {
    const announcementComment = this.announcementCommentRepository.create({
      announcement: __announcement,
      commentatorFullName: __commentatorEmail,
      contentBody: __requestBody.contentBody,
    });
    await this.announcementCommentRepository.save(announcementComment);

    const entityTransformer = new EntityTransformer<
      AnnouncementComment,
      AddAnnouncementCommentResponseDTO
    >(AddAnnouncementCommentResponseDTO);
    return entityTransformer.fromEntity(announcementComment);
  }
}
