import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MCQAnswer } from 'src/entities/mcq-answer.entity';
import { Question } from 'src/entities/question.entity';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, MCQAnswer])],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
