import { AssignedAssignment } from 'src/entities/assigned-assignment.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssignedService {
  constructor(
    @InjectRepository(AssignedAssignment)
    private readonly assignedAssignmentRepository: Repository<AssignedAssignment>,
  ) {}

  async fetchAssigned(__email: string) {
    const results = this.assignedAssignmentRepository.find({
      relations: ['assignment'],
      where: {
        createdBy: __email,
      },
    });

    if (results) {
      return results;
    } else {
      throw new NotFoundException([
        `Failure to find assigned assignments by teacher with email ${__email}`,
      ]);
    }
  }
}
