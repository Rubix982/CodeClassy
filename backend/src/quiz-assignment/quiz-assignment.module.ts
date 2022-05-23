import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizAssignment } from 'src/entities/quiz-assignment.entity';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { QuizAssignmentService } from './quiz-assignement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizAssignment]),
    JSONQueryExtractorModule,
  ],
  providers: [QuizAssignmentService],
  controllers: [],
  exports: [QuizAssignmentService],
})
export class QuizAssignmentModule {}
