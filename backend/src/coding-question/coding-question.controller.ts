import { CodingQuestionService } from 'src/coding-question/coding-question.service';
import { Controller, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';

@UseGuards(AppGuard)
@Controller('question')
export class CodingQuestionController {
  constructor(private readonly codingQuestionService: CodingQuestionService) {}
}
