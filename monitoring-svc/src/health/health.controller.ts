import { HealthService } from './health.service';
import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.service.healthCheck();
  }
}
