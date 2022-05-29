import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizAssignment } from 'src/entities/quiz-assignment.entity';
import { JSONQueryExtractorService } from 'src/json-query-extractor/json-query-extractor.service';
import { QuizService } from 'src/quiz/quiz.service';
import { EntityManager, getManager, Repository } from 'typeorm';
import {
  CreateSectionQuizAssignmentDTO,
  CreateStudentQuizAssignmentDTO,
} from './create.dto';

@Injectable()
export class QuizAssignmentService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(QuizAssignment)
    private readonly quizAssignmentRepository: Repository<QuizAssignment>,
    private readonly quizService: QuizService,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async createSectionAssignment(__requestBody: CreateSectionQuizAssignmentDTO) {
    const queryString = this.jsonQueryExtractorService.getQueryByID(9);
    const result = await this.entityManager.query(queryString, [
      __requestBody.dueDate,
      __requestBody.quizID,
      __requestBody.sectionID,
    ]);

    if (!result.affectedRows) {
      throw new BadRequestException(
        `Could not create assignment for students of section: ${__requestBody.sectionID}`,
      );
    }
  }

  async createStudentAssignment(__requestBody: CreateStudentQuizAssignmentDTO) {
    const quizAssignment = this.quizAssignmentRepository.create({
      dueDate: __requestBody.dueDate,
      quizID: __requestBody.quizID,
      studentEmail: __requestBody.studentEmail,
    });

    await this.quizAssignmentRepository.save(quizAssignment);
  }

  async getQuizFromQuizAssignmentID(__quizAssignmentID: string) {
    const { quizID } = await this.quizAssignmentRepository.findOne(
      __quizAssignmentID,
    );
    const [quiz] = await this.quizService.getQuiz(quizID);
    return quiz;
  }
}
