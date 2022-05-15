import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { CreateMCQDTO } from 'src/question/create.dto';
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
}
