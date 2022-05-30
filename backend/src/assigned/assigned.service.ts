import { AssignedAssignment } from 'src/entities/assigned-assignment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AssignedService {
  constructor(
    @InjectRepository(AssignedAssignment)
    private readonly assignedAssignmentRepository: Repository<AssignedAssignment>,
  ) {}
}
