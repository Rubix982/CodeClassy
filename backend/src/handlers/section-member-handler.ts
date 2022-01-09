import { Injectable } from '@nestjs/common';
import { RouteHandler } from './route-handler';
import { Request } from 'express';
import { JWTPayload } from 'src/auth/signin.dto';
import { SectionService } from 'src/section/section.service';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { getManager } from 'typeorm';

@Injectable()
export class SectionMemberRouteHandler extends RouteHandler {
  constructor(
    private readonly sectionService: SectionService,
    private readonly JSONQueryExtractorService: JSONQueryExtractorService,
  ) {
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
      const results = await getManager().query(
        this.JSONQueryExtractorService.getQueryByID(1),
        [__request.params.id, __decodedMember.email],
      );

      if (results.length !== 0) {
        shouldForwardRequest = true;
      } else {
        shouldForwardRequest = await super.handle(__request, __decodedMember);
      }
    }
    return shouldForwardRequest;
  }
}