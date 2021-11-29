import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassroomService } from '../classroom/classroom.service';
import { Request } from 'express';
import { JWTPayload } from 'src/auth/signin.dto';
import { RouteHandler } from './route-handler';

@Injectable()
export class ClassroomOwnerRouteHandler extends RouteHandler {
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
