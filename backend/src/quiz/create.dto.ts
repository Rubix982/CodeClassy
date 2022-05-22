import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class Quiz {
  @MinLength(1)
  @IsString()
  name: string;

  @Min(1)
  @Max(60)
  @IsNumber()
  duration: number;
}

export class CreateQuizDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => Quiz)
  quiz: Quiz;

  @IsString({ each: true })
  questions: string[];
}
