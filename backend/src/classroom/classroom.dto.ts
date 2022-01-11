import { IsString, MinLength } from 'class-validator';

export class ClassroomRequestDTO {
  @MinLength(1)
  @IsString()
  name: string;

  @IsString()
  description: string;
}
