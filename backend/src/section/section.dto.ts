import { IsEmail, IsString } from 'class-validator';

export class SectionRequestDTO {
  @IsString()
  name: string;

  @IsEmail()
  assignedTo: string;
}
