import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { Member } from 'src/entities/member.entity';
import EntityTransformer from 'src/helper/EntityTransformer';
import { MemberService } from 'src/member/member.service';
import { JWTPayload, SignInDto } from './signin.dto';
import { SignUpDto } from './signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MemberService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtService,
  ) {}

  public async signUpUser(__requestBody: SignUpDto) {
    const hashedPassword: string =
      await this.cryptoService.generateHashedPassword(__requestBody.password);

    const member: Member = new Member(
      __requestBody.email,
      __requestBody.fullName,
      hashedPassword,
      __requestBody.role,
    );

    await this.memberService.createMember(member);
  }

  public async signInUser(__requestBody: SignInDto) {
    const member: Member = await this.memberService.findOne(
      __requestBody.email,
    );

    if (!member) {
      throw new NotFoundException(['Email is invalid!']);
    }

    const isPasswordVerified: boolean =
      await this.cryptoService.verifyHashedPassword(
        __requestBody.password,
        member.password,
      );

    if (!isPasswordVerified) {
      throw new UnauthorizedException(['Password is incorrect']);
    }

    const entityTransformer = new EntityTransformer<Member, JWTPayload>(
      JWTPayload,
    );

    const jwtPayload = entityTransformer.fromEntity(member);
    let redirectUrl = '';

    if (member.role === 'Teacher') {
      redirectUrl = '/t/home';
    } else {
      redirectUrl = '/s/home';
    }

    const accessToken = this.jwtService.sign({ ...jwtPayload });
    return { accessToken, redirectUrl };
  }

  async validateAccessToken(__accessToken: string) {
    try {
      const payload = await this.jwtService.verify(__accessToken);
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
