import { CodingQuestionService } from 'src/coding-question/coding-question.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { JWTPayload } from 'src/auth/signin.dto';
import { CodingQuestionRequestDTO } from 'src/coding-question/coding-question.dto';

@UseGuards(AppGuard)
@Controller('coding-question')
export class CodingQuestionController {
  constructor(private readonly codingQuestionService: CodingQuestionService) {}

  @Get()
  async getCodingQuestions(@RequestDecodedMember() __member: JWTPayload) {
    const codingQuestionResults =
      await this.codingQuestionService.getCodingQuestions(__member.email);

    return {
      msg: 'Successfully fetched assignments created by Teacher',
      codingQuestionResults,
    };
  }

  @Post()
  async addCodingQuestion(
    @RequestDecodedMember() __member: JWTPayload,
    @Body() __requestBody: CodingQuestionRequestDTO,
  ) {
    console.log('Here');
    const codingQuestionResult =
      await this.codingQuestionService.createCodingQuestion(
        __member.email,
        __requestBody,
      );

    return {
      msg: `Successfully created coding question`,
      codingQuestionResult,
    };
  }

  @Delete(':id')
  async deleteCodingQuestion(@Param('id') __codingQuestionID: string) {
    await this.codingQuestionService.deleteCodingQuestion(__codingQuestionID);
  }
}
