import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MCQAnswer } from 'src/entities/mcq-answer.entity';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateMCQDTO } from './create.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,

    @InjectRepository(MCQAnswer)
    private readonly mcqAnswerRepository: Repository<MCQAnswer>,
  ) {}

  async createMCQ(__teacherEmail: string, __requestBody: CreateMCQDTO) {
    const question = this.questionRepository.create({
      body: __requestBody.question.body,
      categoryID: __requestBody.question.categoryID,
      createdBy: __teacherEmail,
    });
    await this.questionRepository.save(question);

    const answers = __requestBody.answers.map((answer) => ({
      ...answer,
      questionID: question.ID,
    }));
    await this.mcqAnswerRepository.insert(answers);

    return question;
  }
}
