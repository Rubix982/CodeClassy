import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTPayload } from 'src/auth/signin.dto';

@Injectable()
export class ClassroomGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { accessToken } = request.cookies;
    let shouldForwardRequest = null;

    try {
      const decodedMember: JWTPayload =
        await this.authService.validateAccessToken(accessToken);

      if (decodedMember.role === 'Teacher') {
        request.member = decodedMember;
        shouldForwardRequest = true;
      }
    } catch (error) {
      shouldForwardRequest = false;
    }

    return shouldForwardRequest;
  }
}
