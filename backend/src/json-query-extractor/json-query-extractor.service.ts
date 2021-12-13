import { Injectable } from '@nestjs/common';
import { JSONQuery } from './json-query';
import * as jsonFileQueries from './queries.json';

@Injectable()
export class JSONQueryExtractorService {
  private readonly jsonQueries: Map<number, string> = new Map<number, string>();

  constructor() {
    jsonFileQueries.forEach((jsonQuery: JSONQuery) => {
      this.jsonQueries.set(jsonQuery.id, jsonQuery.query);
    });
  }

  public getQueryByID(__queryID: number): string {
    let query: string = '';

    if (this.jsonQueries.has(__queryID)) {
      query = this.jsonQueries.get(__queryID);
    }

    return query;
  }
}
