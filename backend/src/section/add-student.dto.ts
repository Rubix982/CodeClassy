import { IsEmail } from 'class-validator';

export class AddStudentDTO {
  @IsEmail()
  email: string;
}
