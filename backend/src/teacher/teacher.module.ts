import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { Teacher } from 'src/entities/teacher.entity';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { QuestionModule } from 'src/question/question.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { TeacherQuestionController } from './question.controller';
import { TeacherQuizController } from './quiz.controller';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    AuthModule,
    ClassroomModule,
    CategoryModule,
    QuestionModule,
    QuizModule,
    JSONQueryExtractorModule,
  ],
  controllers: [
    TeacherController,
    TeacherQuestionController,
    TeacherQuizController,
  ],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
