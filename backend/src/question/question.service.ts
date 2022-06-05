import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FreeTextAnswer } from 'src/entities/free-text-answer.entity';
import { MCQAnswer } from 'src/entities/mcq-answer.entity';
import { Question } from 'src/entities/question.entity';
import { TrueFalseAnswer } from 'src/entities/true-false-answer.entity';
import { Repository } from 'typeorm';
import {
  Question as QuestionDTO,
  CreateFreeTextQuestionDTO,
  CreateMCQDTO,
  CreateTrueFalseQuestionDTO,
} from './create.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(MCQAnswer)
    private readonly mcqAnswerRepository: Repository<MCQAnswer>,

    @InjectRepository(TrueFalseAnswer)
    private readonly trueFalseAnswerRepository: Repository<TrueFalseAnswer>,

    @InjectRepository(FreeTextAnswer)
    private readonly freeTextAnswerRepository: Repository<FreeTextAnswer>,
  ) {}

  private async createQuestion(
    __question: QuestionDTO,
    __type: string,
    __createdBy: string,
  ): Promise<Question> {
    const question = this.questionRepository.create({
      title: __question.title,
      body: __question.body,
      categoryID: __question.categoryID,
      points: __question.points,
      createdBy: __createdBy,
      type: __type,
    });
    await this.questionRepository.save(question);

    return question;
  }

  async getQuestions(__teacherEmail: String) {
    const questions = await this.questionRepository.find({
      where: {
        createdBy: __teacherEmail,
      },
    });
    return questions;
  }

  async createMCQ(__teacherEmail: string, __requestBody: CreateMCQDTO) {
    const question = await this.createQuestion(
      __requestBody.question,
      'MCQ',
      __teacherEmail,
    );

    const answers = __requestBody.answers.map((answer) => ({
      ...answer,
      questionID: question.ID,
    }));
    await this.mcqAnswerRepository.insert(answers);

    return question;
  }

  async createTrueFalseQuestion(
    __teacherEmail: string,
    __requestBody: CreateTrueFalseQuestionDTO,
  ) {
    const question = await this.createQuestion(
      __requestBody.question,
      'TF',
      __teacherEmail,
    );

    const answer = this.trueFalseAnswerRepository.create({
      correctChoice: __requestBody.correctChoice,
      questionID: question.ID,
    });
    await this.trueFalseAnswerRepository.save(answer);

    return question;
  }

  async createFreeTextQuestion(
    __teacherEmail: string,
    __requestBody: CreateFreeTextQuestionDTO,
  ) {
    const question = await this.createQuestion(
      __requestBody.question,
      'FT',
      __teacherEmail,
    );

    const answers = __requestBody.answers.map((answer) => ({
      ...answer,
      questionID: question.ID,
    }));
    await this.freeTextAnswerRepository.insert(answers);

    return question;
  }
}
