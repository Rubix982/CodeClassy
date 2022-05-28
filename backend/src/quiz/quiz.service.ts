import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { EntityManager, getManager, Repository } from 'typeorm';
import { Quiz as QuizDTO, CreateQuizDTO } from './create.dto';

@Injectable()
export class QuizService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async getQuiz(__quizID: string) {
    const queryString = this.jsonQueryExtractorService.getQueryByID(10);
    const quiz = await this.entityManager.query(queryString, [
      __quizID,
      __quizID,
      __quizID,
      __quizID,
    ]);

    return quiz;
  }

  async createQuizEntity(__quiz: QuizDTO, __createdBy: string) {
    const quiz = this.quizRepository.create({
      name: __quiz.name,
      duration: __quiz.duration,
      createdBy: __createdBy,
    });
    await this.quizRepository.save(quiz);

    return quiz;
  }

  async createQuiz(__teacherEmail: string, __requestBody: CreateQuizDTO) {
    const quiz = await this.createQuizEntity(
      __requestBody.quiz,
      __teacherEmail,
    );

    const quizQuestions = __requestBody.questions.map((questionID) => [
      quiz.ID,
      questionID,
    ]);
    const queryString = this.jsonQueryExtractorService.getQueryByID(8);
    await this.entityManager.query(queryString, [quizQuestions]);

    return quiz;
  }
}
