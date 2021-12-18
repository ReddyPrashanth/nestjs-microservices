import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello world! Welcome to microservices monitoring service',
    };
  }
}
