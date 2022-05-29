import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { QuizAssignment } from 'src/entities/quiz-assignment.entity';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { QuizModule } from 'src/quiz/quiz.module';
import { QuizAssignmentService } from './quiz-assignment.service';
import { QuizAssignmentController } from './quiz-assignment.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizAssignment]),
    AuthModule,
    forwardRef(() => QuizModule),
    JSONQueryExtractorModule,
  ],
  providers: [QuizAssignmentService],
  controllers: [QuizAssignmentController],
  exports: [QuizAssignmentService],
})
export class QuizAssignmentModule {}
