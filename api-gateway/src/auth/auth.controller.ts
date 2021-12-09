import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IRequestWithUser } from './interfaces/request-with-user.interface';
import { UserDto } from './../users/dtos/user.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  async signUp(@Body() userDto: UserDto) {
    return await this.authService.signUp(userDto);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: IRequestWithUser) {
    const user = request.user;
    console.log(user);
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @Post('logout')
  async logout(@Request() request: IRequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async authenticate(@Request() request: IRequestWithUser) {
    return request.user;
  }
}
