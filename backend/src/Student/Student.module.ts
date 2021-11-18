import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/entities/Student.entity';
import { StudentService } from './Student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
