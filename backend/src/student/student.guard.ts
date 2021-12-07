import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JWTPayload } from 'src/auth/signin.dto';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let shouldForwardRequest = false;

    const decodedMember: JWTPayload = request.member;

    if (decodedMember.role === 'Student') {
      request.member = decodedMember;
      shouldForwardRequest = true;
    }

    return shouldForwardRequest;
  }
}
