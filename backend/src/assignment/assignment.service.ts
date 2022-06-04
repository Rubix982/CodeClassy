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
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
    private readonly codingQuestionService: CodingQuestionService,
    private readonly teacherService: TeacherService,
  ) {}

  async getAllAssignmentsByTeacher(__email: string) {
    const result = this.assignmentRepository.find({
      where: {
        createdBy: __email,
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

  async createAssignment(__email: string, __requestBody: AssignmentRequestDTO) {
    try {
      const teacher = await this.teacherService.findTeacher(__email);

      const codingQuestion =
        await this.codingQuestionService.findCodingQuestion(
          __requestBody.codingQuestionId,
        );

      const assignment = this.assignmentRepository.create({
        name: __requestBody.name,
        codingQuestion: codingQuestion,
        createdBy: teacher,
      });

      await this.assignmentRepository.save(assignment);
    } catch (error) {}

    throw new BadRequestException([
      `Could not successfully create the assignment with name, ${__requestBody.name}`,
    ]);
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
}
