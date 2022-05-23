import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import {
  CreateSectionQuizAssignmentDTO,
  CreateStudentQuizAssignmentDTO,
} from 'src/quiz-assignment/create.dto';
import { QuizAssignmentService } from 'src/quiz-assignment/quiz-assignement.service';
import { TeacherGuard } from 'src/teacher/teacher.guard';

@UseGuards(AppGuard, TeacherGuard)
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizAssignmentService: QuizAssignmentService) {}

  @Post('section')
  async createSectionAssignment(
    @Body() __requestBody: CreateSectionQuizAssignmentDTO,
  ) {
    await this.quizAssignmentService.createSectionAssignment(__requestBody);
    return {
      msg: `Successfully assigned quiz: ${__requestBody.quizID} to students of section: ${__requestBody.sectionID}`,
    };
  }

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
