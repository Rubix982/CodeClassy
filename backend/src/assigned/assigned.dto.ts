import { ValidateFloatConstraints } from './ValidateFloatConstraint';
import { IsISO8601 } from 'class-validator';

export class CreateAssignedAssignmentRequestDTO {
  @IsISO8601()
  dueDate: string;

  @ValidateFloatConstraints()
}
