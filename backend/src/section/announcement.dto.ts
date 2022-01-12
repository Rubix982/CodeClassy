import { IsString } from 'class-validator';

export class AnnouncementRequestDTO {
  @IsString()
  contentBody: string;
}
