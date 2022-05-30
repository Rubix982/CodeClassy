import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MCQ {
  @IsString()
  questionID: string;

  @IsString()
  answer: string;
}

export class TFQ {
  @IsString()
  questionID: string;

  @IsBoolean()
  answer: boolean;
}

export class FTQ {
  @IsString()
  questionID: string;

  @IsString()
  answer: string;
}

export class EvaluateQuizAssignmentDTO {
  @IsArray()
  @ValidateNested()
  @Type(() => MCQ)
  MCQs: MCQ[];

  @IsArray()
  @ValidateNested()
  @Type(() => TFQ)
  TFQs: TFQ[];

  @IsArray()
  @ValidateNested()
  @Type(() => FTQ)
  FTQs: FTQ[];
}
