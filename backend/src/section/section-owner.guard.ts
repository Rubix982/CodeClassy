import {
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JWTPayload } from 'src/auth/signin.dto';
import { SectionOwnerRouteHandler } from 'src/handlers/section-owner-handler';

@Injectable()
export class SectionOwnerGuard {
  private shouldForwardRequest = false;

  constructor(private readonly rootHandler: SectionOwnerRouteHandler) {}

  handleError(__error: Error) {
    if (__error instanceof NotFoundException) {
      throw __error;
    } else {
      this.shouldForwardRequest = false;
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const decodedMember: JWTPayload = request.member;
      this.shouldForwardRequest = await this.rootHandler.handle(
        request,
        decodedMember,
      );
    } catch (error) {
      this.handleError(error);
    }

    return this.shouldForwardRequest;
  }
}
