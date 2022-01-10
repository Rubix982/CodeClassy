import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';
import { JWTPayload } from 'src/auth/signin.dto';
import { RequestDecodedMember } from 'src/decorators/member.decorator';
import { TeacherGuard } from 'src/teacher/teacher.guard';
import { CategoryService } from './category.service';

@UseGuards(AppGuard, TeacherGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getTeacherCategories(@RequestDecodedMember() __member: JWTPayload) {
    const categories = await this.categoryService.getCategories(__member.email);
    return categories;
  }
}
