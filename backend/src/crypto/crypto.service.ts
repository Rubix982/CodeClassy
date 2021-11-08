import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor() {}
  generateHashString(__length: number) {
    const hashString = randomBytes(__length).toString('hex');
    return hashString;
  }
  async generateHashedPassword(__password: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(__password, salt);
    return hashedPassword;
  }
}
