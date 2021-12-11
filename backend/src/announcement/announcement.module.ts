import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement } from 'src/entities/announcement.entity';
import { AnnouncementService } from './announcement.service';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement])],
  controllers: [],
  providers: [AnnouncementService],
  exports: [AnnouncementService],
})
export class AnnouncementModule {}
