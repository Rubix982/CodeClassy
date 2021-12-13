import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementCommentModule } from 'src/announcement-comment/announcement-comment.module';
import { AuthModule } from 'src/auth/auth.module';
import { Announcement } from 'src/entities/announcement.entity';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement]),
    AnnouncementCommentModule,
    AuthModule,
  ],
  controllers: [AnnouncementController],
  providers: [AnnouncementService],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
