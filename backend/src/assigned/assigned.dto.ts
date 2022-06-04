import { ValidateFloatConstraints } from './ValidateFloatConstraint';
import { IsISO8601, Validate } from 'class-validator';

export class CreateAssignedAssignmentRequestDTO {
  @IsISO8601()
  dueDate: string;

  @Validate(ValidateFloatConstraints, {
    message: `Score is stored in the invalid format!`,
  })
  score;
}
