import { Controller, Get } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}
  @Get()
  async findAll() {
    const members = await this.memberService.findAll();
    return members;
  }
}
