import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { StudentGuard } from 'src/student/student.guard';
import { QuizAssignmentService } from './quiz-assignment.service';

@UseGuards(AppGuard, StudentGuard)
@Controller('quiz-assignment')
export class QuizAssignmentController {
  constructor(private readonly quizAssignmentService: QuizAssignmentService) {}

  @Get(':id')
  async getQuizAssignment(@Param('id') __quizAssignmentID) {
    const quiz = await this.quizAssignmentService.getQuizFromQuizAssignmentID(
      __quizAssignmentID,
    );

    if (!quiz) {
      return new BadRequestException(
        `Could not fetch quiz with ID: ${quiz.ID}`,
      );
    }

    return quiz;
  }
}
