import { TestCase } from 'src/entities/test-case.entity';
import { JSONQueryExtractorModule } from './../json-query-extractor/json-query-extractor.module';
import { TeacherModule } from './../teacher/teacher.module';
import { CodingQuestionService } from 'src/coding-question/coding-question.service';
import { CodingQuestionController } from './coding-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { CodingQuestion } from 'src/entities/coding-question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CodingQuestion, TestCase]),
    JSONQueryExtractorModule,
    AuthModule,
    TeacherModule,
  ],
  controllers: [CodingQuestionController],
  providers: [CodingQuestionService],
  exports: [CodingQuestionService],
})
export class CodingQuestionModule {}
