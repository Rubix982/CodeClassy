import { IsString, MinLength } from 'class-validator';

export class CreateClassroomDTO {
  @MinLength(1)
  @IsString()
  name: string;

  @IsString()
  description: string;
}
