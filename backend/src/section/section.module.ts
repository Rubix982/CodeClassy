import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';
import { SectionService } from './section.service';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [],
  providers: [SectionService],
  exports: [SectionService],
})
export class SectionModule {}
