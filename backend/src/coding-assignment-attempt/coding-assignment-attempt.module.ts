import { CodingAssignmentAttemptService } from './coding-assignment-attempt.service';
import { CodingAssignmentAttemptController } from './coding-assignment-attempt.controller';
import { AssignmentModule } from 'src/assignment/assignment.module';
import { StudentModule } from 'src/student/Student.module';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AuthModule,
    AssignmentModule,
    StudentModule,
    JSONQueryExtractorModule,
  ],
  controllers: [CodingAssignmentAttemptController],
  providers: [CodingAssignmentAttemptService],
  exports: [CodingAssignmentAttemptService],
})
export class CodingAssignmentAttemptModule {}
