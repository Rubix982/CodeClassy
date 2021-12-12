import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from 'src/member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from 'ormconfig';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { AuthModule } from 'src/auth/auth.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { MemberVerificationModule } from 'src/member-verification/member-verification.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { StudentModule } from 'src/student/Student.module';
import { SectionModule } from 'src/section/section.module';
import { AnnouncementModule } from 'src/announcement/announcement.module';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { SectionStudentModule } from 'src/section-student/section-student.module';
import { AnnouncementCommentModule } from 'src/announcement-comment/announcement-comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    MemberModule,
    ClassroomModule,
    AuthModule,
    MemberVerificationModule,
    TeacherModule,
    StudentModule,
    SectionModule,
    AnnouncementModule,
    SectionStudentModule,
    AnnouncementCommentModule,
    CryptoModule,
    JSONQueryExtractorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
