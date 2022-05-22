import { IsNumber, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateQuizDTO {
  @MinLength(1)
  @IsString()
  name: string;

  @Min(1)
  @Max(60)
  @IsNumber()
  duration: number;
}
