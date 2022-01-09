import { IsString, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @MinLength(1)
  @IsString()
  name: string;
}
