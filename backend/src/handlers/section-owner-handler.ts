import { Injectable, NotFoundException } from '@nestjs/common';
import { ClassroomService } from '../classroom/classroom.service';
import { Request } from 'express';
import { JWTPayload } from 'src/auth/signin.dto';
import { RouteHandler } from './route-handler';
import { SectionService } from 'src/section/section.service';

@Injectable()
export class SectionOwnerRouteHandler extends RouteHandler {
  constructor(
    private readonly classroomService: ClassroomService,
    private readonly sectionService: SectionService,
  ) {
    super();
  }

  async handle(
    __request: Request,
    __decodedMember: JWTPayload,
  ): Promise<boolean> {
    let shouldForwardRequest = false;

    const section = await this.sectionService.getSection(__request.params.id);

    const classroom = await this.classroomService.getClassroom(
      section.classroomID,
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
