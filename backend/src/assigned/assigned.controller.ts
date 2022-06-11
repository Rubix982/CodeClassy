import {
  CreateAssignedAssignmentDTO,
  CreateAssignedAssignmentForSectionDTO,
} from './assigned.dto';
import { JWTPayload } from 'src/auth/signin.dto';
import { AssignedService } from 'src/assigned/assigned.service';
import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { RequestDecodedMember } from 'src/decorators/member.decorator';

@UseGuards(AppGuard)
@Controller('assigned')
export class AssignedController {
  constructor(private readonly assignedService: AssignedService) {}

  @Get(':id')
  async getAssignedAssignmentDetails(
    @RequestDecodedMember() __member: JWTPayload,
    @Param('id') __assignmentID: string,
  ) {
    const data = await this.assignedService.fetchAssigned({
      __email: __member.email,
      __assignedID: __assignmentID,
    });

    return {
      msg: `Successfully fetched assigned assignments by teacher`,
      data,
    };
  }

  @Post(':id')
  async createAssignedAssignment(
    @Param('id') __id: string,
    @Body() __requestBody: CreateAssignedAssignmentDTO,
  ) {
    const results = await this.assignedService.createAssignedAssignment({
      __assignmentID: __id,
      __emails: __requestBody.emails,
    });

    const greaterThanOne: boolean = __requestBody.emails.length > 1;

    return {
      msg: `Successfully assigned assignment to student${
        greaterThanOne ? 's' : ''
      } with email${greaterThanOne ? 's' : ''}: ${__requestBody.emails}`,
      results,
    };
  }

  @Post(':assignmentID/section')
  async createAssignedAssignmentForSection(
    @Param('assignmentID') __assignmentID: string,
    @Body() __requestBody: CreateAssignedAssignmentForSectionDTO,
  ) {
    const results =
      await this.assignedService.createAssignedAssignmentForSection({
        __assignmentID,
        __sectionID: __requestBody.id,
      });

    return {
      msg: `Successfully assigned assignment to section with id ${__requestBody.id}`,
      results,
    };
  }

  @Delete(':assignmentID/:email')
  async removeStudentFromAssignment(
    @Param('assignmentID') __assignmentID: string,
    @Param('email') __email: string,
  ) {
    const { results, assignment } = await this.assignedService.removeStudent({
      __assignmentID,
      __email,
    });

    return {
      msg: `Successfully removed ${__email} from assignment: "${assignment.name}"`,
      results,
    };
  }
}
