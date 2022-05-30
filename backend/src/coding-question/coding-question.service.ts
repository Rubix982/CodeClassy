import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/entities/coding-question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CodingQuestionService {
  constructor(
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>,
  ) {}
}
