import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassroomService } from '../classroom.service';
import { Request } from 'express';
import { JWTPayload } from 'src/auth/signin.dto';

interface ClassroomRouteHandlerI {
  setNext(__handler: ClassroomRouteHandlerI): ClassroomRouteHandlerI;
  handle(__request: Request, __decodedMember: JWTPayload): Promise<boolean>;
}

abstract class ClassroomRouteHandler implements ClassroomRouteHandlerI {
  private nextHandler: ClassroomRouteHandlerI;

  setNext(__handler: ClassroomRouteHandlerI): ClassroomRouteHandlerI {
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

@Injectable()
export class ClassroomOwnerRouteHandler extends ClassroomRouteHandler {
  constructor(private readonly classroomService: ClassroomService) {
    super();
  }

  async handle(
    __request: Request,
    __decodedMember: JWTPayload,
  ): Promise<boolean> {
    let shouldForwardRequest = false;

    const classroom = await this.classroomService.getClassroom(
      __request.params.id,
    );

    if (classroom) {
      const classroomOwner = classroom.createdBy;
      if (classroomOwner === __decodedMember.email) {
        shouldForwardRequest = true;
      } else {
        shouldForwardRequest = await super.handle(__request, __decodedMember);
      }

      return shouldForwardRequest;
    } else {
      throw new NotFoundException();
    }
  }
}
