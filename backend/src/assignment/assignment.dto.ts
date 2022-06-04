import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AssignmentRequestDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  codingQuestionId: string;

  @IsString()
  @IsNotEmpty()
  createdById: string;
}
