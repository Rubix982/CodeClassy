import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/entities/section.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SectionModule {}
