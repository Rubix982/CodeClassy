import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementModule } from 'src/announcement/announcement.module';
import { AuthModule } from 'src/auth/auth.module';
import { Section } from 'src/entities/section.entity';
import { SectionMemberRouteHandler } from 'src/handlers/section-member-handler';
import { StudentModule } from 'src/student/Student.module';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { SectionOwnerRouteHandler } from 'src/handlers/section-owner-handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Section]),
    AuthModule,
    StudentModule,
    forwardRef(() => ClassroomModule),
    AnnouncementModule,
    JSONQueryExtractorModule,
  ],
  controllers: [SectionController],
  providers: [
    SectionService,
    SectionMemberRouteHandler,
    SectionOwnerRouteHandler,
  ],
  exports: [SectionService],
})
export class SectionModule {}
