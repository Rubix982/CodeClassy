import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class ValidateFloatConstraints implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const regExp = /^\d+(\.\d{1,2})?$/;

    return regExp.test(text); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Text ($value) is too short or too long!';
  }
}
