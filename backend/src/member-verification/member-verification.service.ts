import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/crypto/crypto.service';
import { Member } from 'src/entities/member.entity';
import { MemberVerification } from 'src/entities/member-verification.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberVerificationService {
  constructor(
    @InjectRepository(MemberVerification)
    private readonly memberVerificationRepository: Repository<MemberVerification>,
    private readonly cryptoService: CryptoService,
  ) {}

  async createVerificationEntity(__member: Member) {
    const hashString = this.cryptoService.generateHashString(30);

    const verificationEntity = this.memberVerificationRepository.create({
      hashString,
      member: __member,
    });

    await this.memberVerificationRepository.save(verificationEntity);

    return verificationEntity;
  }
}
