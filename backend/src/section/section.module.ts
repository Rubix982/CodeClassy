import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementModule } from 'src/announcement/announcement.module';
import { AuthModule } from 'src/auth/auth.module';
import { Section } from 'src/entities/section.entity';
import { SectionTeacherRouteHandler } from 'src/handlers/section-teacher-handler';
import { StudentModule } from 'src/student/Student.module';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section]),
    AuthModule,
    StudentModule,
    AnnouncementModule,
  ],
  controllers: [SectionController],
  providers: [SectionService, SectionTeacherRouteHandler],
  exports: [SectionService],
})
export class SectionModule {}
