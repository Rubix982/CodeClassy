import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreeTextAnswer } from 'src/entities/free-text-answer.entity';
import { MCQAnswer } from 'src/entities/mcq-answer.entity';
import { Question } from 'src/entities/question.entity';
import { TrueFalseAnswer } from 'src/entities/true-false-answer.entity';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      MCQAnswer,
      TrueFalseAnswer,
      FreeTextAnswer,
    ]),
  ],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
