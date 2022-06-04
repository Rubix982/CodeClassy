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

  async createAssignedAssignmentForIndividual(
    __assignmentID: string,
    __email: string,
  ) {
    try {
      // const convergenceConnectionString =
      //   'https://localhost/realtime/convergence/default';
      // Convergence.connectAnonymously(convergenceConnectionString, __email).then(
      //   (domain) => {
      //     console.log(this.presenceService.session());
      //     return domain.models().openAutoCreate({
      //       collection: 'default',
      //     });
      //   },
      // );
      return true;
    } catch (error) {}

    throw new BadRequestException([
      `Could not successfully assign the assignment to individual student with the email '${__email}'`,
    ]);
  }

  async createAssignedAssignmentForGroup(
    __assignmentID: string,
    __emails: string[],
  ) {
    try {
      return true;
    } catch (error) {}

    throw new BadRequestException([
      `Could not successfully assign the assignment to the students with the emails '${__emails}'`,
    ]);
  }

  async createAssignedAssignmentForSection(
    __assignmentID: string,
    __sectionID: string,
  ) {
    try {
      return true;
    } catch (error) {}

    throw new BadRequestException([
      `Could not successfully assign the assignment to the section with id '${__sectionID}'`,
    ]);
  }
}
