import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MCQAnswer } from 'src/entities/mcq-answer.entity';
import { Question } from 'src/entities/question.entity';
import { TrueFalseAnswer } from 'src/entities/true-false-answer.entity';
import { Repository } from 'typeorm';
import { CreateMCQDTO, CreateTrueFalseQuestionDTO } from './create.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(MCQAnswer)
    private readonly mcqAnswerRepository: Repository<MCQAnswer>,

    @InjectRepository(TrueFalseAnswer)
    private readonly trueFalseAnswerRepository: Repository<TrueFalseAnswer>,
  ) {}

  private async createQuestion(
    __body: string,
    __categoryID: string,
    __createdBy: string,
  ): Promise<Question> {
    const question = this.questionRepository.create({
      body: __body,
      categoryID: __categoryID,
      createdBy: __createdBy,
    });
    await this.questionRepository.save(question);

    return question;
  }

  async createMCQ(__teacherEmail: string, __requestBody: CreateMCQDTO) {
    const question = await this.createQuestion(
      __requestBody.question.body,
      __requestBody.question.categoryID,
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
      __requestBody.question.body,
      __requestBody.question.categoryID,
      __teacherEmail,
    );

    const answer = this.trueFalseAnswerRepository.create({
      correctChoice: __requestBody.correctChoice,
      questionID: question.ID,
    });
    await this.trueFalseAnswerRepository.save(answer);

    return question;
  }
}
