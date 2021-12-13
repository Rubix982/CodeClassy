import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementComment } from 'src/entities/announcement-comment.entity';
import { AnnouncementCommentService } from './announcement-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementComment])],
  providers: [AnnouncementCommentService],
  exports: [AnnouncementCommentService],
})
export class AnnouncementCommentModule {}
