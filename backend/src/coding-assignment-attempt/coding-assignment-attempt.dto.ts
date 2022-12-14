import { IsString } from 'class-validator';

export class CodingAssignmentAttemptRequestDTO {
  @IsString()
  code: string;

  @IsString()
  language: string;
}
