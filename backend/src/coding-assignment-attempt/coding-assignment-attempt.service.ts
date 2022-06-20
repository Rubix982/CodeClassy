import axios from 'axios';
import { CodingAssignmentAttemptRequestDTO } from './coding-assignment-attempt.dto';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
require('dotenv').config();

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
        [assignmentID, assignmentID],
      );

      return editorDataResults;
    } catch (error) {
      throw new BadRequestException([`${error}`]);
    }
  }

  async makeSubmission({
    assignmentID,
    __requestBody,
  }: {
    assignmentID: string;
    __requestBody: CodingAssignmentAttemptRequestDTO;
  }): Promise<any> {
    try {
      const responses: any[] = [];
      const results: any[] = [];

      const queryString: string =
        this.jsonQueryExtratorService.getQueryByID(21);
      const testCases: any[] = await this.entityManager.query(queryString, [
        assignmentID,
        assignmentID,
      ]);

      testCases.forEach(async (testCase) => {
        const JSONContent = {
          src: __requestBody.code,
          stdin: testCase.in,
          lang: 'c',
          timeout: 60,
        };

        responses.push(
          await axios.post(process.env.RCE_SERVER, JSONContent, {
            headers: {
              'Content-Type': 'application/json',
            },
          }),
        );
      });

      setTimeout(async () => {
        responses.forEach(async (response: any) => {
          const result: any = await axios.get(response.data, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (result.data.output === '') {
            results.push(result.data.stderr);
          } else {
            results.push(
              JSON.stringify(result.data.output.split('\n'), null, 2),
            );
          }
        });
      }, testCases.length * 60 * 1000);
      // The timeout for each processing is set to 60 on the RCE server

      return results;
    } catch (error) {
      throw new BadRequestException([`${error}`]);
    }
  }
}
