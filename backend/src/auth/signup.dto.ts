import { IsEmail, IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @MinLength(15, {
    message: 'Email must be greater than or equal to 15 characters',
  })
  @MaxLength(255, {
    message: 'Email must be shorter than or equal to 255 characters',
  })
  readonly email: string;

  @IsString()
  readonly fullName: string;

  @IsString()
  @MinLength(8, {
    message: 'Password must be greater than or equal to 8 characters',
  })
  @MaxLength(128, {
    message: 'Password must be shorter than or equal to 128 characters',
  })
  readonly password: string;

  @IsIn(['Student', 'Teacher'])
  readonly role: string;
}
