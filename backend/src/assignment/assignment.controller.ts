import { AssignmentRequestDTO } from './assignment.dto';
import { JWTPayload } from 'src/auth/signin.dto';
import { TeacherGuard } from 'src/teacher/teacher.guard';
import { AssignmentService } from 'src/assignment/assignment.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Delete,
  Param,
} from '@nestjs/common';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { AppGuard } from 'src/app/app.guard';

@UseGuards(AppGuard, TeacherGuard)
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  async getAssignments(@RequestDecodedMember() __member: JWTPayload) {
    const assignmentResults = this.assignmentService.getAllAssignmentsByTeacher(
      __member.email,
    );

    return {
      msg: 'Successfully fetched assignments created by teacher',
      assignmentResults,
    };
  }

  @Post()
  async createAssignment(
    @RequestDecodedMember() __member: JWTPayload,
    @Body() __requestBody: AssignmentRequestDTO,
  ) {
    const createAssignmentResults =
      await this.assignmentService.createAssignment(
        __member.email,
        __requestBody,
      );

    return {
      msg: `Successfully created assignment`,
      createAssignmentResults,
    };
  }

  @Delete(':id')
  async deleteAssignment(@Param('id') __assignmentId: string) {
    await this.assignmentService.deleteAssignment(__assignmentId);

    return {
      msg: `Successfully deleted assignment with id ${__assignmentId}`,
    };
  }
}
