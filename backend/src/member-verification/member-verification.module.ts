import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from 'src/crypto/crypto.module';
import { MemberVerification } from 'src/entities/member-verification.entity';
import { MemberVerificationService } from './member-verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([MemberVerification]), CryptoModule],
  providers: [MemberVerificationService],
  exports: [MemberVerificationService],
})
export class MemberVerificationModule {}
