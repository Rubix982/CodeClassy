import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from 'src/entities/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepository: Repository<Assignment>,
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
}
