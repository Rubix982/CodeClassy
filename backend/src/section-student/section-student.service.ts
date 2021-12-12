import { Injectable } from '@nestjs/common';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { getManager } from 'typeorm';

@Injectable()
export class SectionStudentService {
  constructor(
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {}

  public async sectionContainsStudent(
    __sectionID: string,
    __studentEmail: string,
  ): Promise<boolean> {
    const queryString = this.jsonQueryExtractorService.getQueryByID(1);
    const entityManager = getManager();
    const result = await entityManager.query(queryString, [
      __sectionID,
      __studentEmail,
    ]);

    let sectionContainsStudent: boolean = false;
    if (result) {
      sectionContainsStudent = true;
    }

    return sectionContainsStudent;
  }
}
