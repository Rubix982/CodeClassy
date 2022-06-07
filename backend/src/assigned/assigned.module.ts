import { SectionModule } from './../section/section.module';
import { StudentModule } from './../student/Student.module';
import { AssignmentModule } from './../assignment/assignment.module';
import { AssignedAssignmentByStudent } from './../entities/assigned-assignment-by-student.entity';
import { JSONQueryExtractorModule } from './../json-query-extractor/json-query-extractor.module';
import { AssignedService } from 'src/assigned/assigned.service';
import { AssignedController } from './assigned.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Student } from 'src/entities/student.entity';
import { Assignment } from 'src/entities/assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AssignedAssignmentByStudent,
      Student,
      Assignment,
    ]),
    AuthModule,
    JSONQueryExtractorModule,
    AssignmentModule,
    StudentModule,
    SectionModule,
  ],
  controllers: [AssignedController],
  providers: [AssignedService],
  exports: [AssignedService],
})
export class AssignedModule {}
