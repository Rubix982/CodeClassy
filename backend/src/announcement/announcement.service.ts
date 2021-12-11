import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/entities/announcement.entity';
import { Section } from 'src/entities/section.entity';
import { AddAnnouncementDTO } from 'src/section/add-announcement.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
  ) {}

  async createAnnouncement(
    __section: Section,
    __requestBody: AddAnnouncementDTO,
  ) {
    const announcement = this.announcementRepository.create({
      section: __section,
      contentBody: __requestBody.contentBody,
    });

    await this.announcementRepository.save(announcement);
    return announcement.ID;
  }
}
