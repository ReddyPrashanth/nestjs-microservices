import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { TransformInterceptor } from './../interceptors/transform.interceptor';
import { UsersService } from './users.service';
import { Express, Response } from 'express';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaginatedQueryDto } from 'src/dtos/base.dto';
import { IRequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  find(@Query() query: PaginatedQueryDto) {
    return this.service.find(query);
  }

  @Post('avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadUserProfile(
    @Request() request: IRequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { buffer } = file;
    return await this.service.uploadProfile(buffer, request.user);
  }

  @Get('avatar')
  @UseGuards(JwtAuthGuard)
  getProfilePic(
    @Request() request: IRequestWithUser,
    @Res() response: Response,
  ) {
    const { avatarKey } = request.user;
    const stream = this.service.getProfile(avatarKey);
    stream.on('error', (error: any) => {
      response
        .status(error?.statusCode)
        .send({ message: error?.message, statusCode: error?.statusCode });
    });
    stream.pipe(response);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }
}
