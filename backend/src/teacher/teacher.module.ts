import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ClassroomModule } from 'src/classroom/classroom.module';
import { Teacher } from 'src/entities/teacher.entity';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher]), AuthModule, ClassroomModule],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}