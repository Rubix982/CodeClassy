import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { MemberVerificationModule } from 'src/member-verification/member-verification.module';
import { StudentModule } from 'src/Student/Student.module';
import { TeacherModule } from 'src/Teacher/Teacher.module';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    MemberVerificationModule,
    TeacherModule,
    StudentModule,
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
