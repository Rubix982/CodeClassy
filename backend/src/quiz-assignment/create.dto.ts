import { IsDate, IsISO8601, IsString } from 'class-validator';

export class CreateSectionQuizAssignmentDTO {
  @IsString()
  quizID: string;

  @IsISO8601()
  dueDate: string;

  @IsString()
  sectionID: string;
}
