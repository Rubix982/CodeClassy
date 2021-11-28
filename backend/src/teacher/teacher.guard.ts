import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTPayload } from 'src/auth/signin.dto';

@Injectable()
export class TeacherGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let shouldForwardRequest = false;

    const decodedMember: JWTPayload = request.member;

    if (decodedMember.role === 'Teacher') {
      request.member = decodedMember;
      shouldForwardRequest = true;

      return shouldForwardRequest;
    }
  }
}
