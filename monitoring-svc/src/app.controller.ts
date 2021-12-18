import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello() {
    return {
      message: 'Hello world! Welcome to microservices monitoring service',
    };
  }
}
