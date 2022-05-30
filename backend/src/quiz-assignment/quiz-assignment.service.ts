import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { QuizAssignment } from 'src/entities/quiz-assignment.entity';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { QuizResultService } from 'src/quiz-result/quiz-result.service';
import { QuizService } from 'src/quiz/quiz.service';
import { EntityManager, getManager, Repository } from 'typeorm';
import {
  CreateSectionQuizAssignmentDTO,
  CreateStudentQuizAssignmentDTO,
} from './create.dto';
import { EvaluateQuizAssignmentDTO } from './evaluate-quiz.dto';
import { QuizEvaluationService } from './quiz-evaluation.service';

@Injectable()
export class QuizAssignmentService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(QuizAssignment)
    private readonly quizAssignmentRepository: Repository<QuizAssignment>,
    private readonly quizService: QuizService,
    private readonly quizEvaluationService: QuizEvaluationService,
    private readonly quizResultService: QuizResultService,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async createSectionAssignment(__requestBody: CreateSectionQuizAssignmentDTO) {
    const queryString = this.jsonQueryExtractorService.getQueryByID(9);
    const result = await this.entityManager.query(queryString, [
      __requestBody.dueDate,
      __requestBody.quizID,
      __requestBody.sectionID,
    ]);

    if (!result.affectedRows) {
      throw new BadRequestException(
        `Could not create assignment for students of section: ${__requestBody.sectionID}`,
      );
    }
  }

  async createStudentAssignment(__requestBody: CreateStudentQuizAssignmentDTO) {
    const quizAssignment = this.quizAssignmentRepository.create({
      dueDate: __requestBody.dueDate,
      quizID: __requestBody.quizID,
      studentEmail: __requestBody.studentEmail,
    });

    await this.quizAssignmentRepository.save(quizAssignment);
  }

  async getQuizFromQuizAssignmentID(__quizAssignmentID: string) {
    const { quizID } = await this.quizAssignmentRepository.findOne(
      __quizAssignmentID,
    );
    const [quiz] = await this.quizService.getQuiz(quizID);
    return quiz;
  }

  async evaluateQuizAssignment(
    __quizAssignmentID: string,
    __studentEmail: string,
    __requestBody: EvaluateQuizAssignmentDTO,
  ) {
    const mcqScore = await this.quizEvaluationService.evaluateMCQs(
      __requestBody.MCQs,
    );
    const tfqScore = await this.quizEvaluationService.evaluateTFQs(
      __requestBody.TFQs,
    );
    const ftqScore = await this.quizEvaluationService.evaluateFTQs(
      __requestBody.FTQs,
    );

    const totalPoints =
      mcqScore.totalPoints + tfqScore.totalPoints + ftqScore.totalPoints;
    const obtainedPoints =
      mcqScore.totalObtainedPoints +
      tfqScore.totalObtainedPoints +
      ftqScore.totalObtainedPoints;

    const submittedAt = moment().format('YYYY-MM-DD');
    await this.quizResultService.createQuizResult(__quizAssignmentID, {
      studentEmail: __studentEmail,
      obtainedPoints,
      totalPoints,
      submittedAt,
    });

    return { obtainedPoints, totalPoints };
  }
}
