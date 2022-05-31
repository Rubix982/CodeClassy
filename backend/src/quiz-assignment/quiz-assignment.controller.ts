import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { StudentGuard } from 'src/student/student.guard';
import { EvaluateQuizAssignmentDTO } from './evaluate-quiz.dto';
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

  @Post(':id')
  async evaluateQuizAssignment(
    @Param('id') __quizAssignmentID: string,
    @Body() __requestBody: EvaluateQuizAssignmentDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const result = await this.quizAssignmentService.evaluateQuizAssignment(
      __quizAssignmentID,
      __member.email,
      __requestBody,
    );
    return {
      msg: `Successfully submitted quiz Assignment: ${__quizAssignmentID}`,
      result,
    };
  }
}
