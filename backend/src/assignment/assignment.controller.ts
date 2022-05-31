import { JWTPayload } from 'src/auth/signin.dto';
import { TeacherGuard } from 'src/teacher/teacher.guard';
import { AssignmentService } from 'src/assignment/assignment.service';
import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
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
}
