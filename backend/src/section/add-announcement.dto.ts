import { IsString } from 'class-validator';

export class AddAnnouncementDTO {
  @IsString()
  contentBody: string;
}
