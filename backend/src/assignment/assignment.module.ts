import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { CodingQuestionModule } from './../coding-question/coding-question.module';
import { TeacherModule } from './../teacher/teacher.module';
import { AssignmentService } from 'src/assignment/assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Assignment } from 'src/entities/assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Assignment]),
    CodingQuestionModule,
    AuthModule,
    TeacherModule,
    JSONQueryExtractorModule,
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService],
  exports: [AssignmentService],
})
export class AssignmentModule {}
