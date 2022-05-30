import { AssignmentService } from 'src/assignment/assignment.service';
import { Controller, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';

@UseGuards(AppGuard)
@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}
}
