import { CodingQuestionService } from 'src/coding-question/coding-question.service';
import { CodingQuestionController } from './coding-question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { CodingQuestion } from 'src/entities/coding-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CodingQuestion]), AuthModule],
  controllers: [CodingQuestionController],
  providers: [CodingQuestionService],
  exports: [CodingQuestionService],
})
export class CodingQuestionModule {}
