import { GetSectionDTO } from './../section/get-section.dto';
import { SectionService } from './../section/section.service';
import { StudentService } from 'src/student/student.service';
import { AssignmentService } from 'src/assignment/assignment.service';
import { AssignedAssignmentByStudent } from './../entities/assigned-assignment-by-student.entity';
import { JSONQueryExtractorService } from './../json-query-extractor/json-query-extractor.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, EntityManager } from 'typeorm';
import { Student } from 'src/entities/student.entity';
import { Assignment } from 'src/entities/assignment.entity';

@Injectable()
export class AssignedService {
  private readonly entityManager: EntityManager;

  constructor(
    @InjectRepository(AssignedAssignmentByStudent)
    private readonly assignedAssignmentByStudentRepository: Repository<AssignedAssignmentByStudent>,
    private readonly assignmentService: AssignmentService,
    private readonly studentService: StudentService,
    private readonly sectionService: SectionService,
    private readonly jsonQueryExtractorService: JSONQueryExtractorService,
  ) {
    this.entityManager = getManager();
  }

  async fetchAssigned({
    __email,
    __assignedID,
  }: {
    __email: string;
    __assignedID: string;
  }): Promise<any> {
    const queryString: string = this.jsonQueryExtractorService.getQueryByID(17);
    const results = await this.entityManager.query(queryString, [
      __assignedID,
      __email,
      __email,
      __assignedID,
      __assignedID,
      __email,
      __assignedID,
    ]);

    if (results) {
      return results;
    } else {
      return {};
    }
  }

  async createAssignedAssignment({
    __assignmentID,
    __emails,
  }: {
    __assignmentID: string;
    __emails: string[];
  }): Promise<AssignedAssignmentByStudent[]> {
    try {
      const students: Student[] = [];
      const assignedAssignmentByStudents: AssignedAssignmentByStudent[] = [];
      const assignment: Assignment =
        await this.assignmentService.getAssignmentByID(__assignmentID);

      for (var i = 0; i < __emails.length; i++) {
        students.push(await this.studentService.getStudent(__emails[i]));
      }

      students.forEach((student) => {
        assignedAssignmentByStudents.push(
          this.assignedAssignmentByStudentRepository.create({
            assignment: assignment,
            student: student,
          }),
        );
      });

      await this.assignedAssignmentByStudentRepository.save(
        assignedAssignmentByStudents,
      );

      return assignedAssignmentByStudents;
    } catch (error) {
      const greaterThanOne: boolean = __emails.length > 1;
      throw new BadRequestException([
        `Could not successfully assign the assignment to the student${
          greaterThanOne ? 's' : ''
        } with the email${greaterThanOne ? 's' : ''}: '${__emails}'`,
      ]);
    }
  }

  async createAssignedAssignmentForSection({
    __assignmentID,
    __sectionID,
  }: {
    __assignmentID: string;
    __sectionID: string;
  }): Promise<AssignedAssignmentByStudent[]> {
    try {
      const sectionData: GetSectionDTO =
        await this.sectionService.getSectionData(__sectionID);
      const emails: string[] = [];

      sectionData.students.forEach((student) => {
        emails.push(student.email);
      });

      return this.createAssignedAssignment({
        __assignmentID,
        __emails: emails,
      });
    } catch (error) {
      throw new BadRequestException([
        `Could not successfully assign the assignment to the section with id '${__sectionID}'`,
      ]);
    }
  }

  async removeStudent({
    __assignmentID,
    __email,
  }: {
    __assignmentID: string;
    __email: string;
  }): Promise<{ results: any; assignment: Assignment }> {
    try {
      const assignment: Assignment =
        await this.assignmentService.getAssignmentByID(__assignmentID);

      const queryString: string =
        this.jsonQueryExtractorService.getQueryByID(19);
      const results = await this.entityManager.query(queryString, [
        __assignmentID,
        __email,
      ]);

      if (results) {
        return { results, assignment };
      }
    } catch (error) {
      throw new BadRequestException([`Could not remove student ${__email}!`]);
    }
  }
}
