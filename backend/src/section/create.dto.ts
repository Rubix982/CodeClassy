import { IsEmail, IsString } from 'class-validator';

export class CreateSectionDTO {
  @IsString()
  name: string;

  @IsEmail()
  assignedTo: string;
}
