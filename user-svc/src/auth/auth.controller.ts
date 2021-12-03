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
import PermissionsGuard from './guards/permission.guard';
import UsersPermission from './permissions/users-permission.enum';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDto: UserDto) {
    return await this.authService.signUp(userDto);
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: IRequestWithUser) {
    const user = request.user;
    const cookie = this.authService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @Post('logout')
  async logout(@Request() request: IRequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
  }

  @Get('me')
  @UseGuards(
    PermissionsGuard(UsersPermission.CREATE_USER, UsersPermission.DELETE_USER),
  )
  async authenticate(@Request() request: IRequestWithUser) {
    return request.user;
  }
}
