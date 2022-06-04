import { JWTPayload } from 'src/auth/signin.dto';
import { AssignedService } from 'src/assigned/assigned.service';
import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { RequestDecodedMember } from 'src/decorators/member.decorator';

@UseGuards(AppGuard)
@Controller('assigned')
export class AssignedController {
  constructor(private readonly AssignedService: AssignedService) {}

  @Get()
  async getAssignedAssignments(@RequestDecodedMember() __member: JWTPayload) {
    const results = this.AssignedService.fetchAssigned(__member.email);

    return {
      msg: `Successfully fetched assigned assignments by teacher`,
      results,
    };
  }

  @Post()
  async createAssignedAssignment(@RequestDecodedMember() __member: JWTPayload) {
    const assignedAssignment =
      await this.AssignedService.createAssignedAssignment(__member.email);

    return {
      msg: `Successfully assigned assignments to students`,
      assignedAssignment,
    };
  }
}
