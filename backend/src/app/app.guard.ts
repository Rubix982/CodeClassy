import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTPayload } from 'src/auth/signin.dto';

@Injectable()
export class AppGuard implements CanActivate {
  private shouldForwardRequest = false;

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { accessToken } = request.cookies;

    try {
      const decodedMember: JWTPayload =
        await this.authService.validateAccessToken(accessToken);
      request.member = decodedMember;
      this.shouldForwardRequest = true;
    } catch (error) {
      this.shouldForwardRequest = false;
    }

    return this.shouldForwardRequest;
  }
}
