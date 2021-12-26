import { ServiceDto } from './dtos/monitoring.dto';
import { HealthService } from './health.service';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(private readonly service: HealthService) {}

  @MessagePattern({ cmd: 'health_check' })
  async check() {
    const data = await this.service.healthCheck();
    return { data };
  }

  @MessagePattern({ cmd: 'create_service' })
  async create(@Payload() dto: ServiceDto) {
    return await this.service.createService(dto);
  }
}
