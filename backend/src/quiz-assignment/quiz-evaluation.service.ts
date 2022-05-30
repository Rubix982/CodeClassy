import { Injectable } from '@nestjs/common';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager } from 'typeorm';
import { FTQ, MCQ, TFQ } from './evaluate-quiz.dto';

@Injectable()
export class QuizEvaluationService {
  private readonly entityManager: EntityManager;

  constructor(
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async evaluateQuestion(
    __questions: MCQ[] | TFQ[] | FTQ[],
    __queryID: number,
  ) {
    let totalObtainedPoints = 0;
    let totalPoints = 0;
    const queryString = this.jsonQueryExtractorService.getQueryByID(__queryID);

    if (__questions) {
      for (let i = 0; i < __questions.length; i++) {
        const [result] = await this.entityManager.query(queryString, [
          __questions[i].answer,
          __questions[i].questionID,
        ]);
        const obtainedPoints = Number(result.obtainedPoints);
        totalObtainedPoints += obtainedPoints;
        totalPoints += result.totalPoints;
      }
    }
    return { totalObtainedPoints, totalPoints };
  }

  async evaluateMCQs(__mcqs: MCQ[]) {
    let mcqScore = await this.evaluateQuestion(__mcqs, 11);
    return mcqScore;
  }

  async evaluateTFQs(__tfqs: TFQ[]) {
    let tfqScore = await this.evaluateQuestion(__tfqs, 12);
    return tfqScore;
  }

  async evaluateFTQs(__ftqs: FTQ[]) {
    let ftqScore = await this.evaluateQuestion(__ftqs, 13);
    return ftqScore;
  }
}
