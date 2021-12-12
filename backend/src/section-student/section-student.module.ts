import { Module } from '@nestjs/common';
import { JSONQueryExtractorModule } from 'src/json-query-extractor/json-query-extractor.module';
import { SectionStudentService } from './section-student.service';

@Module({
  imports: [JSONQueryExtractorModule],
  providers: [SectionStudentService],
  exports: [SectionStudentService],
})
export class SectionStudentModule {}
