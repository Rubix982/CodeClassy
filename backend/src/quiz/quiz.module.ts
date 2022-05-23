import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Quiz } from 'src/entities/quiz.entity';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { QuizAssignmentModule } from 'src/quiz-assignment/quiz-assignment.module';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz]),
    AuthModule,
    QuizAssignmentModule,
    JSONQueryExtractorModule,
  ],
  providers: [QuizService],
  controllers: [QuizController],
  exports: [QuizService],
})
export class QuizModule {}
