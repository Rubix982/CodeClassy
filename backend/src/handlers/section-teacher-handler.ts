import { Injectable } from '@nestjs/common';
import { RouteHandler } from './route-handler';
import { Request } from 'express';
import { JWTPayload } from 'src/auth/signin.dto';
import { SectionService } from 'src/section/section.service';

@Injectable()
export class SectionTeacherRouteHandler extends RouteHandler {
  constructor(private readonly sectionService: SectionService) {
    super();
  }

  async handle(
    __request: Request,
    __decodedMember: JWTPayload,
  ): Promise<boolean> {
    let shouldForwardRequest = false;

    const section = await this.sectionService.getSection(__request.params.id);

    if (section.teacherEmail === __decodedMember.email) {
      shouldForwardRequest = true;
    } else {
      shouldForwardRequest = await super.handle(__request, __decodedMember);
    }
    return shouldForwardRequest;
  }
}
