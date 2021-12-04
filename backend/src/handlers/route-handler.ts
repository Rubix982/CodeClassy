import { JWTPayload } from 'src/auth/signin.dto';
import { Request } from 'express';

interface RouteHandlerI {
  setNext(__handler: RouteHandlerI): RouteHandlerI;
  handle(__request: Request, __decodedMember: JWTPayload): Promise<boolean>;
}

export abstract class RouteHandler implements RouteHandlerI {
  private nextHandler: RouteHandlerI;

  setNext(__handler: RouteHandlerI): RouteHandlerI {
    this.nextHandler = __handler;
    return __handler;
  }

  async handle(
    __request: Request,
    __decodedMember: JWTPayload,
  ): Promise<boolean> {
    let shouldForwardRequest = false;

    if (this.nextHandler) {
      shouldForwardRequest =
        shouldForwardRequest ||
        (await this.nextHandler.handle(__request, __decodedMember));
    }

    return shouldForwardRequest;
  }
}
