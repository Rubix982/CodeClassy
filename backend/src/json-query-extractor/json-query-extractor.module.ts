import { Module } from '@nestjs/common';
import { JSONQueryExtractorService } from './json-query-extractor.service';

@Module({
  imports: [],
  providers: [JSONQueryExtractorService],
  exports: [JSONQueryExtractorService],
})
export class JSONQueryExtractorModule {}
