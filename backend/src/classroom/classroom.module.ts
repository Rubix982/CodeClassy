import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Classroom } from 'src/entities/classroom.entity';
import { SectionModule } from 'src/section/section.module';
import { TeacherModule } from 'src/teacher/teacher.module';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';
import { ClassroomOwnerRouteHandler } from 'src/handlers/classroom-owner-handler';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom]),
    AuthModule,
    forwardRef(() => TeacherModule),
    forwardRef(() => MemberModule),
    SectionModule,
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService, ClassroomOwnerRouteHandler],
  exports: [ClassroomService],
})
export class ClassroomModule {}