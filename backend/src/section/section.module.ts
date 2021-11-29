import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';
import { StudentModule } from 'src/student/Student.module';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), StudentModule],
  controllers: [SectionController],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
