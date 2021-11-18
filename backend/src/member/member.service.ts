import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberVerification } from 'src/entities/member-verification.entity';
import { Member } from 'src/entities/member.entity';
import { MemberVerificationService } from 'src/member-verification/member-verification.service';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly memberVerificationService: MemberVerificationService,
  ) {}

  async findAll() {
    const members = await this.memberRepository.find();
    return members;
  }

  async createMember(__member: Member) {
    const memberWithEmail = await this.memberRepository.findOne(__member.email);

    if (!memberWithEmail) {
      await this.memberRepository.save(__member);

      const verificationEntity: MemberVerification =
        await this.memberVerificationService.createVerificationEntity(__member);

      __member.verification = verificationEntity;
      await this.memberRepository.update(__member.email, {
        verification: verificationEntity,
      });
    } else {
      throw new BadRequestException(['Account present for specified email']);
    }
  }

  async findOne(__email: string) {
    const member = this.memberRepository.findOne(__email, {
      relations: ['verification'],
    });

    return member;
  }
}
