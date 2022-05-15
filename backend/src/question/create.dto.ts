import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsJSON,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class Question {
  @IsJSON()
  body: string;

  @IsString()
  categoryID: string;

  @IsNumber()
  points: number;
}

class MCQAnswer {
  @IsJSON()
  body: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class CreateMCQDTO {
  @IsObject()
  @ValidateNested()
  @Type(() => Question)
  question: Question;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => MCQAnswer)
  answers: MCQAnswer[];
}
