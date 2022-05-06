import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/entities/announcement.entity';
import { Section } from 'src/entities/section.entity';
import { AnnouncementRequestDTO } from 'src/section/announcement.dto';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager, Repository } from 'typeorm';
import { JWTPayload } from 'src/auth/signin.dto';
import { GetAnnouncementDTO } from './get-announcement.dto';

@Injectable()
export class AnnouncementService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async createAnnouncement(
    __section: Section,
    __requestBody: AnnouncementRequestDTO,
    __member: JWTPayload,
  ) {
    const announcement = this.announcementRepository.create({
      section: __section,
      contentBody: __requestBody.contentBody,
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

  async getAnnouncementWithComments(__announcementID: string) {
    const queryString: string = this.jsonQueryExtractorService.getQueryByID(5);
    const [announcementData] = await this.entityManager.query(queryString, [
      __announcementID,
      __announcementID,
    ]);
    return new GetAnnouncementDTO(announcementData);
  }

  async updateAnnouncement(
    __announcement: Announcement,
    __requestBody: AnnouncementRequestDTO,
  ) {
    __announcement.contentBody = __requestBody.contentBody;
    return await this.announcementRepository.save(__announcement);
  }

  async deleteAnnouncement(__announcementID: string) {
    await this.announcementRepository.delete(__announcementID);
  }
}
