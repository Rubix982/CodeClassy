import { CodingQuestionRequestDTO } from 'src/coding-question/coding-question.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/entities/coding-question.entity';
import { Repository } from 'typeorm';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class CodingQuestionService {
  constructor(
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>,
    private readonly teacherService: TeacherService,
  ) {}

  async getCodingQuestions(__email: string) {
    const result = this.codingQuestionRepository.find({
      where: {
        createdBy: __email,
      },
    });

    if (result) {
      return result;
    } else {
      throw new NotFoundException([
        `Could not find coding questions for user with email: ${__email}`,
      ]);
    }
  }

  async findCodingQuestion(__id: string) {
    const result = await this.codingQuestionRepository.findOneOrFail({
      where: { id: __id },
    });

    return result;
  }

  async createCodingQuestion(
    __email: string,
    __requestBody: CodingQuestionRequestDTO,
  ) {
    try {
      const requestedTeacher = await this.teacherService.findTeacher(__email);

      

      const codingQuestion = this.codingQuestionRepository.create({
        title: __requestBody.title,
        body: __requestBody.body,
        testCases: __requestBody.testCases,
        assignments: [],
        createdBy: requestedTeacher,
      });

      await this.codingQuestionRepository.save(codingQuestion);
    } catch (error) {
      console.log(error);
      throw new BadRequestException([
        `Could not find teacher with provided email, ${__email}`,
      ]);
    }
  }

  async deleteCodingQuestion(__codingQuestionID: string) {
    try {
      await this.codingQuestionRepository
        .createQueryBuilder()
        .delete()
        .from(CodingQuestion)
        .where('id = :id', { id: __codingQuestionID })
        .execute();
    } catch (error) {}

    throw new BadRequestException([
      `Coding Question with id, ${__codingQuestionID} could not be deleted`,
    ]);
  }
}
