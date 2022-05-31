import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/entities/coding-question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodingQuestionService {
  constructor(
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>,
  ) {}

  async getCodingQuestions(__email: string) {
    const result = this.codingQuestionRepository.find({
      where: {
        createdBy: __email,
      },
    });

    if (result) {
      return result;
    } else {
      throw new NotFoundException([
        `Could not find coding questions for user with email: ${__email}`,
      ]);
    }
  }
}
