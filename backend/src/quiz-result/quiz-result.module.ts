import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizResult } from 'src/entities/quiz-result.entity';
import { QuizResultService } from './quiz-result.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuizResult])],
  providers: [QuizResultService],
  controllers: [],
  exports: [QuizResultService],
})
export class QuizResultModule {}
