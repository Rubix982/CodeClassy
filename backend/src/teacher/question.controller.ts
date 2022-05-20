import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import {
  CreateFreeTextQuestionDTO,
  CreateMCQDTO,
  CreateTrueFalseQuestionDTO,
} from 'src/question/create.dto';
import { QuestionService } from 'src/question/question.service';

@UseGuards(AppGuard)
@Controller('teacher/question')
export class TeacherQuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('mcq')
  async createMCQQuestion(
    @Body() __requestBody: CreateMCQDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const question = await this.questionService.createMCQ(
      __member.email,
      __requestBody,
    );
    return {
      msg: `Successfully created question: ${question.ID}`,
      question,
    };
  }

  @Post('true-false')
  async createTrueFalseQuestion(
    @Body() __requestBody: CreateTrueFalseQuestionDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const question = await this.questionService.createTrueFalseQuestion(
      __member.email,
      __requestBody,
    );

    return {
      msg: `Successfully created question: ${question.ID}`,
      question,
    };
  }

  @Post('free-text')
  async createFreeTextQuestion(
    @Body() __requestBody: CreateFreeTextQuestionDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const question = await this.questionService.createFreeTextQuestion(
      __member.email,
      __requestBody,
    );

    return {
      msg: `Successfully created question: ${question.ID}`,
      question,
    };
  }
}
