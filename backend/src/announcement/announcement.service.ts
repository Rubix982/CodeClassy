import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/entities/announcement.entity';
import { Section } from 'src/entities/section.entity';
import { AddAnnouncementDTO } from 'src/section/add-announcement.dto';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { getManager, Repository } from 'typeorm';
import { JWTPayload } from 'src/auth/signin.dto';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {}

  async createAnnouncement(
    __section: Section,
    __requestBody: AddAnnouncementDTO,
    __member: JWTPayload,
  ) {
    const announcement = this.announcementRepository.create({
      section: __section,
      contentBody: __requestBody.contentBody,
      announcer: __member.email,
    });

    await this.announcementRepository.save(announcement);
    return announcement;
  }

  async getAnnouncement(__announcementID: string) {
    const announcement = await this.announcementRepository.findOne(
      __announcementID,
    );

    if (announcement) {
      return announcement;
    } else {
      throw new NotFoundException([
        `Could not find announcement with ID: ${__announcementID}`,
      ]);
    }
  }
}
