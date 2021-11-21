import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Classroom } from 'src/entities/classroom.entity';
import { TeacherModule } from 'src/teacher/teacher.module';
import { ClassroomController } from './classroom.controller';
import { ClassroomService } from './classroom.service';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom]), AuthModule, TeacherModule],
  controllers: [ClassroomController],
  providers: [ClassroomService],
  exports: [],
})
export class ClassroomModule {}
