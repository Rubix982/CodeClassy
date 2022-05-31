import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizResult } from 'src/entities/quiz-result.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizResultService {
  constructor(
    @InjectRepository(QuizResult)
    private readonly quizResultRepository: Repository<QuizResult>,
  ) {}

  async createQuizResult(
    __quizAssignmentID: string,
    __resultData: {
      studentEmail: string;
      obtainedPoints: number;
      totalPoints: number;
      submittedAt: string;
    },
  ) {
    const quizResult = this.quizResultRepository.create({
      studentEmail: __resultData.studentEmail,
      obtainedPoints: __resultData.obtainedPoints,
      totalPoints: __resultData.totalPoints,
      submittedAt: __resultData.submittedAt,
      quizAssignmentID: __quizAssignmentID,
    });

    await this.quizResultRepository.save(quizResult);
  }
}
