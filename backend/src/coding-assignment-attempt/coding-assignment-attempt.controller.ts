import { JWTPayload } from 'src/auth/signin.dto';
import { StudentGuard } from 'src/student/student.guard';
import { AppGuard } from 'src/app/app.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { CodingAssignmentAttemptService } from './coding-assignment-attempt.service';

@UseGuards(AppGuard, StudentGuard)
@Controller('attempt')
export class CodingAssignmentAttemptController {
  constructor(
    private readonly codingAssignmentAttemptService: CodingAssignmentAttemptService,
  ) {}

  @Get(':assignmentID/:modelID')
  async getAssignmentDetails(
    @Param('assignmentID') assignmentID: string,
    @Param('modelID') modelID: string,
    @RequestDecodedMember() member: JWTPayload,
  ) {
    const results = await this.codingAssignmentAttemptService.fetchAssignment({
      email: member.email,
      assignmentID,
      modelID,
    });

    return {
      msg: `Successfully fetch assignment!`,
      results,
    };
  }
}
