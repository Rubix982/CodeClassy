import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class CodingAssignmentAttemptService {
  private readonly entityManager: EntityManager;

  constructor(
    private readonly jsonQueryExtratorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async fetchAssignment({
    email,
    assignmentID,
    modelID,
  }: {
    email: string;
    assignmentID: string;
    modelID: string;
  }): Promise<any> {
    try {
      const studentAccessValidityQueryString: string =
        this.jsonQueryExtratorService.getQueryByID(20);
      const studentAccessValidityResults = await this.entityManager.query(
        studentAccessValidityQueryString,
        [assignmentID, modelID, email],
      );

      if (studentAccessValidityResults.length == 1) {
      } else {
        throw new UnauthorizedException([`Unauthorized accesss`]);
      }

      const editorDataQueryString: string =
        this.jsonQueryExtratorService.getQueryByID(21);
      const editorDataResults = await this.entityManager.query(
        editorDataQueryString,
        [assignmentID],
      );

      return editorDataResults;
    } catch (error) {
      throw new BadRequestException([`${error}`]);
    }
  }
}
