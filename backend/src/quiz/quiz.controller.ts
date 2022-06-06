import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import {
  CreateSectionQuizAssignmentDTO,
  CreateStudentQuizAssignmentDTO,
} from 'src/quiz-assignment/create.dto';
import { QuizAssignmentService } from 'src/quiz-assignment/quiz-assignment.service';
import { TeacherGuard } from 'src/teacher/teacher.guard';
import { QuizService } from './quiz.service';

@UseGuards(AppGuard)
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly quizAssignmentService: QuizAssignmentService,
  ) {}

  @UseGuards(TeacherGuard)
  @Get()
  async getAllQuizzes(@RequestDecodedMember() __member: JWTPayload) {
    const quizzes = await this.quizService.getAllQuizzes(__member.email);
    return {
      msg: 'Successfully fetched all quizzes.',
      quizzes,
    };
  }

  @UseGuards(TeacherGuard)
  @Post('section')
  async createSectionAssignment(
    @Body() __requestBody: CreateSectionQuizAssignmentDTO,
  ) {
    await this.quizAssignmentService.createSectionAssignment(__requestBody);
    return {
      msg: `Successfully assigned quiz: ${__requestBody.quizID} to students of section: ${__requestBody.sectionID}`,
    };
  }

  @UseGuards(TeacherGuard)
  @Post('student')
  async createStudentAssignment(
    @Body() __requestBody: CreateStudentQuizAssignmentDTO,
  ) {
    await this.quizAssignmentService.createStudentAssignment(__requestBody);
    return {
      msg: `Successfully assigned quiz: ${__requestBody.quizID} to student: ${__requestBody.studentEmail}`,
    };
  }
}
