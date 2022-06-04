import { AssignedAssignment } from 'src/entities/assigned-assignment.entity';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Convergence } from '@convergence/convergence';
import { PresenceService } from '@convergence/convergence/typings/presence/PresenceService';

@Injectable()
export class AssignedService {
  constructor(
    @InjectRepository(AssignedAssignment)
    private readonly assignedAssignmentRepository: Repository<AssignedAssignment>,
    private readonly presenceService: PresenceService,
  ) {
    this.presenceService = new PresenceService();
  }

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

  async createAssignedAssignment(__email: string) {
    try {
      const convergenceConnectionString =
        'https://localhost/realtime/convergence/default';

      Convergence.connectAnonymously(convergenceConnectionString, __email).then(
        (domain) => {
          console.log(this.presenceService.session());
          return domain.models().openAutoCreate({
            collection: 'default',
          });
        },
      );
    } catch (error) {}

    throw new BadRequestException([
      `Could not successfully assign the assignments to students`,
    ]);
  }
}
