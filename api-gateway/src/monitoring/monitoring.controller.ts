import { ServiceDto } from './dtos/monitoring.dto';
import { MonitoringService } from './monitoring.service';
import { Body, Controller, Post, Get } from '@nestjs/common';

@Controller('monitoring')
export class MonitoringController {
  constructor(private readonly service: MonitoringService) {}

  @Get()
  find() {
    return this.service.healthCheck();
  }

  @Post()
  create(@Body() dto: ServiceDto) {
    return this.service.createService(dto);
  }
}
