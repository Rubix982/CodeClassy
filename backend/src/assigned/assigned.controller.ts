import {
  CreateAssignedAssignmentForIndividualDTO,
  CreateAssignedAssignmentForGroupDTO,
  CreateAssignedAssignmentForSectionDTO,
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

  @Get(':id')
  async getAssignedAssignmentDetails(
    @RequestDecodedMember() __member: JWTPayload,
    @Param('id') __assignmentID: string,
  ) {
    const data = await this.AssignedService.fetchAssigned(
      __member.email,
      __assignmentID,
    );

    return {
      msg: `Successfully fetched assigned assignments by teacher`,
      data,
    };
  }

  @Post(':assignmentID/individual')
  async createAssignedAssignmentForIndividual(
    @Param('assignmentID') __assignmentID: string,
    @Body() __requestBody: CreateAssignedAssignmentForIndividualDTO,
  ) {
    await this.AssignedService.createAssignedAssignmentForIndividual(
      __assignmentID,
      __requestBody.email,
    );

    return {
      msg: `Successfully assigned assignment to student with email `,
    };
  }

  @Post(':assignmentID/group')
  async createAssignedAssignmentForGroup(
    @Param('assignmentID') __assignmentID: string,
    @Body() __requestBody: CreateAssignedAssignmentForGroupDTO,
  ) {
    await this.AssignedService.createAssignedAssignmentForGroup(
      __assignmentID,
      __requestBody.emails,
    );

    return {
      msg: `Successfully assigned assignment to students with emails, ${__requestBody.emails}`,
    };
  }

  @Post(':assignmentID/section')
  async createAssignedAssignmentForSection(
    @Param('assignmentID') __assignmentID: string,
    @Body() __requestBody: CreateAssignedAssignmentForSectionDTO,
  ) {
    await this.AssignedService.createAssignedAssignmentForSection(
      __assignmentID,
      __requestBody.id,
    );

    return {
      msg: `Successfully assigned assignment to section with id ${__requestBody.id}`,
    };
  }
}
