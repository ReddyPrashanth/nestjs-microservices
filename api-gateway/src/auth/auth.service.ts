import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from './interfaces/token-payload.interface';
import { UsersService } from './../users/users.service';
import { UserDto, AuthCredentialsDto } from './../users/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(userDto: UserDto) {
    return await this.usersService.createUser(userDto);
  }

  signIn(credentials: AuthCredentialsDto) {
    return this.usersService.authenticateUser(credentials);
  }

  getCookieWithJwtToken(userId: number) {
    const payload: ITokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    const cookie = `Authentication=${token}; httpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
    return cookie;
  }

  getCookieForLogout() {
    return `Authentication=; Path=/; Max-Age=0`;
  }
}
