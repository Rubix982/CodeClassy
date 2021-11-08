import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entities/member.entity';
import { MemberVerificationModule } from 'src/member-verification/member-verification.module';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
@Module({
  imports: [TypeOrmModule.forFeature([Member]), MemberVerificationModule],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
