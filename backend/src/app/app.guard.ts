import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JWTPayload } from 'src/auth/signin.dto';

@Injectable()
export class AppGuard implements CanActivate {
  private shouldForwardRequest = false;

  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let accessToken = undefined;
    const request = context.switchToHttp().getRequest();

    if (request.cookies.accessToken) {
      accessToken = request.cookies.accessToken;
    } else if (
      request.rawHeaders[request.rawHeaders.indexOf('accessToken')] != -1
    ) {
      accessToken =
        request.rawHeaders[request.rawHeaders.indexOf('accessToken') + 1];
    }

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
