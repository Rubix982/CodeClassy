import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementComment } from 'src/entities/announcement-comment.entity';
import { AnnouncementCommentController } from './announcement-comment.controller';
import { AnnouncementCommentService } from './announcement-comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementComment])],
  controllers: [AnnouncementCommentController],
  providers: [AnnouncementCommentService],
  exports: [AnnouncementCommentService],
})
export class AnnouncementCommentModule {}
