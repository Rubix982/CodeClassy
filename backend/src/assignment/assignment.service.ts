import { JSONQueryExtractorService } from './../json-query-extractor/json-query-extractor.service';
import { Teacher } from 'src/entities/teacher.entity';
import { CodingQuestionService } from 'src/coding-question/coding-question.service';
import { TeacherService } from './../teacher/teacher.service';
import { CodingQuestion } from 'src/entities/coding-question.entity';
import { AssignmentRequestDTO } from './assignment.dto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/entities/assignment.entity';
import { Repository, EntityManager, getManager } from 'typeorm';

@Injectable()
export class AssignmentService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    private readonly codingQuestionService: CodingQuestionService,
    private readonly teacherService: TeacherService,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async getAllAssignmentsByTeacher(__email: string) {
    const teacher: Teacher = await this.teacherService.findTeacher(__email);

    const result = await this.assignmentRepository.find({
      where: {
        createdBy: teacher,
      },
      order: {
        createdOn: 'ASC',
      },
    });

    if (result) {
      return result;
    } else {
      throw new NotFoundException([
        `Could not find assignment for user with email: ${__email}`,
      ]);
    }
  }

  async getAllAssignmentsByStudent(__email: string) {
    try {
      const queryString: string =
        this.jsonQueryExtractorService.getQueryByID(18);

      const results = await this.entityManager.query(queryString, [__email]);

      if (results) {
        return results;
      } else {
        return {};
      }
    } catch (error) {
      throw new NotFoundException([
        `Could not find assignments for student with email: ${__email}`,
      ]);
    }
  }

  async getAssignmentByID(__assignmentID: string) {
    const result = this.assignmentRepository.findOne({
      where: { id: __assignmentID },
    });

    if (result) {
      return result;
    } else {
      throw new NotFoundException([
        `Could not find assignment with id ${__assignmentID}`,
      ]);
    }
  }

  async createAssignment(__email: string, __requestBody: AssignmentRequestDTO) {
    try {
      const teacher: Teacher = await this.teacherService.findTeacher(__email);

      const codingQuestion: CodingQuestion =
        await this.codingQuestionService.findCodingQuestion(
          __requestBody.codingQuestionId,
        );

      const assignment: Assignment = this.assignmentRepository.create({
        name: __requestBody.name,
        dueDate: __requestBody.dueDate,
        createdOn: new Date(),
        modelID: await this.createUUID(),
        score: 0,
        isSubmitted: false,
        codingQuestion: codingQuestion,
        createdBy: teacher,
      });

      await this.assignmentRepository.save(assignment);

      return assignment;
    } catch (error) {
      throw new BadRequestException([
        `Could not successfully create the assignment with name, ${__requestBody.name}`,
      ]);
    }
  }

  async deleteAssignment(__assignmentId: string) {
    try {
      await this.assignmentRepository
        .createQueryBuilder()
        .delete()
        .where('id = :id', { id: __assignmentId })
        .execute();
    } catch (error) {}

    throw new BadRequestException([
      `Could not successfully delete the assignment with id, ${__assignmentId}`,
    ]);
  }

  async createUUID(): Promise<string> {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      },
    );
    return uuid;
  }
}
