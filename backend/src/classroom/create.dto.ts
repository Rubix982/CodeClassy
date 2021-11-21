import { IsOptional, IsString } from 'class-validator';

export class CreateClassroomDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
