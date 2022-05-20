import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryModule } from 'src/category/category.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { Teacher } from 'src/entities/teacher.entity';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { QuestionModule } from 'src/question/question.module';
import { TeacherQuestionController } from './question.controller';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    AuthModule,
    ClassroomModule,
    CategoryModule,
    QuestionModule,
    JSONQueryExtractorModule,
  ],
  controllers: [TeacherController, TeacherQuestionController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}
