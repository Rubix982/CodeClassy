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
import {
  CreateSectionQuizAssignmentDTO,
  CreateStudentQuizAssignmentDTO,
} from 'src/quiz-assignment/create.dto';
import { QuizAssignmentService } from 'src/quiz-assignment/quiz-assignement.service';
import { StudentGuard } from 'src/student/student.guard';
import { TeacherGuard } from 'src/teacher/teacher.guard';
import { QuizService } from './quiz.service';

@UseGuards(AppGuard)
@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizAssignmentService: QuizAssignmentService,
    private readonly quizService: QuizService,
  ) {}

  @UseGuards(StudentGuard)
  @Get(':id')
  async getQuiz(@Param('id') __quizID: string) {
    const [quiz] = await this.quizService.getQuiz(__quizID);

    if (!quiz) {
      return new BadRequestException(
        `Could not fetch quiz with ID: ${__quizID}`,
      );
    }

    return quiz;
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
