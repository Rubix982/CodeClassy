import { ValidateFloatConstraints } from './ValidateFloatConstraint';
import {
  IsArray,
  IsEmail,
  IsISO8601,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';

export class CreateAssignedAssignmentRequestDTO {
  @IsISO8601()
  dueDate: string;

  @Validate(ValidateFloatConstraints, {
    message: `Score is stored in the invalid format!`,
  })
  score;
}

export class CreateAssignedAssignmentDTO {
  @IsArray()
  emails: string[];
}

export class CreateAssignedAssignmentForSectionDTO {
  @IsString()
  id: string;
}
