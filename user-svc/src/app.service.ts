import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return {
      message: 'Hello world! Welcome to user microservice',
    };
  }
}
