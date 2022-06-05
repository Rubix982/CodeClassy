import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CodingQuestionRequestDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsArray()
  @IsNotEmpty()
  testCases: TestCaseDTO[];
}

class TestCaseDTO {
  @IsString()
  inputs: string;

  @IsString()
  outputs: string;
}
