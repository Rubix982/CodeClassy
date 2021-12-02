import { IsString } from 'class-validator';
import { JWTPayload } from './signin.dto';

export class AuthorizeResponseDTO {
  private readonly fullName: string;
  private readonly role: string;
  private readonly isVerfied: boolean;

  constructor(__user: JWTPayload) {
    this.fullName = __user.fullName;
    this.role = __user.role;
    this.isVerfied = __user.isVerified;
  }
}
