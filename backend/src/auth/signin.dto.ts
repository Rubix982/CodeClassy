import { IsEmail, IsString } from 'class-validator';
import { Member } from 'src/entities/member.entity';

export class SignInDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}

export class JWTPayload {
  readonly email: string;
  readonly fullName: string;
  readonly role: string;
  readonly isVerified: boolean;

  constructor(__member: Member) {
    this.email = __member.email;
    this.fullName = __member.fullName;
    this.role = __member.role;
    this.isVerified = __member.verification.status;
  }
}
