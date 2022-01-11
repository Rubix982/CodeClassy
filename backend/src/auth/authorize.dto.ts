import { JWTPayload } from './signin.dto';

export class AuthorizeResponseDTO {
  private readonly email: string;
  private readonly fullName: string;
  private readonly role: string;
  private readonly isVerfied: boolean;

  constructor(__user: JWTPayload) {
    this.email = __user.email;
    this.fullName = __user.fullName;
    this.role = __user.role;
    this.isVerfied = __user.isVerified;
  }
}
