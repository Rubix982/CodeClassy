import { AssignedService } from 'src/assigned/assigned.service';
import { Controller, UseGuards } from '@nestjs/common';
import { AppGuard } from 'src/app/app.guard';

@UseGuards(AppGuard)
@Controller('assigned')
export class AssignedController {
  constructor(private readonly AssignedService: AssignedService) {}
}
