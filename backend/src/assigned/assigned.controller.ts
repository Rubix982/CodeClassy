import {
  CreateAssignedAssignmentForIndividualDTO,
  CreateAssignedAssignmentForGroupDTO,
} from './assigned.dto';
import { JWTPayload } from 'src/auth/signin.dto';
import { AssignedService } from 'src/assigned/assigned.service';
import { Controller, Get, UseGuards, Post, Body, Param } from '@nestjs/common';
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

  @Post(':assignmentID/individual')
  async createAssignedAssignmentForIndividual(
    @Param('assignmentID') __assignmentID: string,
    @Body() __requestBody: CreateAssignedAssignmentForIndividualDTO,
  ) {
    const assignedAssignment =
      await this.AssignedService.createAssignedAssignmentForIndividual(
        __assignmentID,
        __requestBody.email,
      );

    return {
      msg: `Successfully assigned assignment to student with email `,
      assignedAssignment,
    };
  }

  @Post(':assignmentID/group')
  async createAssignedAssignmentForGroup(
    @Param('assignmentID') __assignmentID: string,
    @Body() __requestBody: CreateAssignedAssignmentForGroupDTO,
  ) {
    const assignedAssignment =
      await this.AssignedService.createAssignedAssignmentForGroup(
        __assignmentID,
        __requestBody.emails,
      );

    return {
      msg: `Successfully assigned assignment to students with emails, ${__requestBody.emails}`,
      assignedAssignment,
    };
  }

  @Post(':assignmentID/section/:sectionId')
  async createAssignedAssignmentForSection(
    @Param('assignmentID') __assignmentID: string,
    @Param('sectionId') __sectionID: string,
  ) {
    const assignedAssignment =
      await this.AssignedService.createAssignedAssignmentForSection(
        __assignmentID,
        __sectionID,
      );

    return {
      msg: `Successfully assigned assignment to section with id ${__sectionID}`,
      assignedAssignment,
    };
  }
}
