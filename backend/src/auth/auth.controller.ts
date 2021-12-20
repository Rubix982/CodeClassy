import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signin.dto';
import { SignUpDto } from './signup.dto';
import { Request, Response } from 'express';
import { AuthorizeResponseDTO } from './authorize.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async authorize(@Req() __request: Request, @Res() __response: Response) {
    try {
      const { accessToken } = __request.cookies;
      const decodedUser = await this.authService.validateAccessToken(
        accessToken,
      );
      const transformedUser = new AuthorizeResponseDTO(decodedUser);
      __response.json(transformedUser);
    } catch (error) {
      __response.clearCookie('accessToken');
      throw new UnauthorizedException();
    }
  }

  @Post('signup')
  async signUp(@Body() __requestBody: SignUpDto) {
    await this.authService.signUpUser(__requestBody);
    return { message: 'Member succesfully created!' };
  }

  @Post('signin')
  async signIn(@Res() response: Response, @Body() __requestBody: SignInDto) {
    const { accessToken, jwtPayload: payload } =
      await this.authService.signInUser(__requestBody);
    response.cookie('accessToken', accessToken, {
      sameSite: true,
      httpOnly: true,
    });
    response
      .status(HttpStatus.OK)
      .json({ message: 'User successfully signed in!', payload });
  }

  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('accessToken');
    response
      .status(HttpStatus.OK)
      .json({ message: 'User successfully logged out' });
  }
}
