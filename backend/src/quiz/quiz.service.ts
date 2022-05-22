import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/entities/quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDTO } from './create.dto';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private readonly quizRepository: Repository<Quiz>,
  ) {}

  async createQuiz(__teacherEmail: string, __requestBody: CreateQuizDTO) {
    const quiz = this.quizRepository.create({
      name: __requestBody.name,
      duration: __requestBody.duration,
      createdBy: __teacherEmail,
    });
    await this.quizRepository.save(quiz);

    return quiz;
  }
}
