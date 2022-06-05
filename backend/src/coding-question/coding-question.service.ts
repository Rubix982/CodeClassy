import { JSONQueryExtractorService } from './../json-query-extractor/json-query-extractor.service';
import { CodingQuestionRequestDTO } from 'src/coding-question/coding-question.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodingQuestion } from 'src/entities/coding-question.entity';
import { EntityManager, Repository, getManager } from 'typeorm';
import { TeacherService } from 'src/teacher/teacher.service';
import { TestCase } from 'src/entities/test-case.entity';

@Injectable()
export class CodingQuestionService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(CodingQuestion)
    private readonly codingQuestionRepository: Repository<CodingQuestion>,
    @InjectRepository(TestCase)
    private readonly testCaseRepository: Repository<TestCase>,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
    private readonly teacherService: TeacherService,
  ) {
    this.entityManager = getManager();
  }

  async getCodingQuestions(__email: string) {
    const queryString: string = this.jsonQueryExtractorService.getQueryByID(14);
    const codingQuestionsData = await this.entityManager.query(queryString, [
      __email,
    ]);

    if (codingQuestionsData) {
      return codingQuestionsData;
    } else {
      return {};
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
        createdBy: requestedTeacher,
      });

      const savedCodingQuestion = await this.codingQuestionRepository.save(
        codingQuestion,
      );

      const testCases: TestCase[] = [];

      __requestBody.testCases.forEach((testCase) => {
        testCases.push(
          this.testCaseRepository.create({
            in: testCase.inputs,
            out: testCase.outputs,
            codingQuestion: savedCodingQuestion,
          }),
        );
      });

      await this.testCaseRepository.save(testCases);
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
