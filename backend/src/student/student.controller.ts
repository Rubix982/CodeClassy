import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { StudentGuard } from './student.guard';
import { StudentService } from './student.service';

@UseGuards(AppGuard, StudentGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get('feed')
  public async getStudentFeed(@RequestDecodedMember() __member: JWTPayload) {
    const studentSections =
      await this.studentService.getAllSectionsByStudentEmail(__member.email);
    return studentSections;
  }

  @Get('quizzes')
  public async getStudentQuizzes(@RequestDecodedMember() __member: JWTPayload) {
    const studentQuizzes =
      await this.studentService.getAllQuizzesByStudentEmail(__member.email);
    return studentQuizzes;
  }
}
