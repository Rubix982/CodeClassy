import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { CreateQuizDTO } from 'src/quiz/create.dto';
import { QuizService } from 'src/quiz/quiz.service';
import { TeacherGuard } from './teacher.guard';

@UseGuards(AppGuard, TeacherGuard)
@Controller('teacher/quiz')
export class TeacherQuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(
    @Body() __requestBody: CreateQuizDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const quiz = await this.quizService.createQuiz(
      __member.email,
      __requestBody,
    );

    return {
      msg: `Successfully created quiz: ${quiz.ID}`,
      quiz,
    };
  }
}
