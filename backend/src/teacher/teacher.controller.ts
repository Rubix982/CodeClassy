import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDTO } from 'src/category/create.dto';
import { ClassroomService } from 'src/classroom/classroom.service';
import { ClassroomRequestDTO } from 'src/classroom/classroom.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { TeacherGuard } from './teacher.guard';
import { TeacherService } from './teacher.service';

@UseGuards(AppGuard, TeacherGuard)
@Controller('teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly classroomService: ClassroomService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post('classroom')
  async createClassroom(
    @Body() __requestBody: ClassroomRequestDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const teacher = await this.teacherService.findTeacher(__member.email);
    const classroomID = await this.classroomService.createClassroom(
      teacher,
      __requestBody,
    );
    return {
      msg: `Successfully created classroom: ${__requestBody.name}`,
      ID: classroomID,
    };
  }

  @Post('category')
  async createCategory(
    @Body() __requestBody: CreateCategoryDTO,
    @RequestDecodedMember() __member: JWTPayload,
  ) {
    const category = await this.categoryService.createCategory(
      __member.email,
      __requestBody,
    );
    return {
      msg: `Successfully created category: ${__requestBody.name}`,
      category,
    };
  }

  @Get('feed')
  async getTeacherFeed(@RequestDecodedMember() __member: JWTPayload) {
    const classrooms = await this.teacherService.getClassrooms(__member.email);
    const sections = await this.teacherService.getSections(__member.email);
    return { classrooms, sections };
  }
}
