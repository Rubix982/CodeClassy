import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberVerification } from 'src/entities/member-verification.entity';
import { Member } from 'src/entities/member.entity';
import { MemberVerificationService } from 'src/member-verification/member-verification.service';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly memberVerificationService: MemberVerificationService,
    private readonly teacherService: TeacherService,
    private readonly studentService: StudentService,
  ) {}

  async findAll() {
    const members = await this.memberRepository.find();
    return members;
  }

  private async isMemberPresentWithEmail(__email: string) {
    let isMemberPresent = false;
    const memberWithEmail = await this.memberRepository.findOne(__email);

    if (memberWithEmail) {
      isMemberPresent = true;
    }

    return isMemberPresent;
  }

  private async createMemberRoleEntity(__member: Member) {
    if (__member.role === 'Teacher') {
      await this.teacherService.createTeacher(__member);
    } else {
      await this.studentService.createStudent(__member);
    }
  }

  async createMember(__member: Member) {
    const isMemberPresent = await this.isMemberPresentWithEmail(__member.email);

    if (!isMemberPresent) {
      await this.memberRepository.save(__member);

      const verificationEntity: MemberVerification =
        await this.memberVerificationService.createVerificationEntity(__member);

      __member.verification = verificationEntity;
      await this.memberRepository.save(__member);
      await this.createMemberRoleEntity(__member);
    } else {
      throw new BadRequestException(['Account present for specified email']);
    }
  }

  async findAllRecordsWithEmails(__emails: string[]) {
    const members = await this.memberRepository
      .createQueryBuilder('members')
      .select('fullName')
      .where('email IN(:...emails)', { emails: __emails })
      .execute();

    if (members) {
      return members;
    } else {
      return [{}];
    }
  }

  async findOne(__email: string) {
    const member = this.memberRepository.findOne(__email, {
      relations: ['verification'],
    });

    return member;
  }
}