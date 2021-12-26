import { HealthService } from './../health/health.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulingService {
  private readonly logger = new Logger(SchedulingService.name);

  constructor(private readonly healthService: HealthService) {}

  // @Cron(CronExpression.EVERY_10_MINUTES)
  async monitorServices() {
    let healthCheck;
    const services = await this.healthService.healthCheck();
    try {
      healthCheck = await this.healthService.checkServiceStatus();
    } catch (error) {
      if (error?.response?.details) {
        healthCheck = error?.response;
      } else {
        this.logger.error(error);
      }
    }
    if (healthCheck) {
      services.forEach((service) => {
        const check = healthCheck.details[service.name];
        if (check) service.status = check.status;
      });
      await this.healthService.updateServiceHealth(services);
    }
  }
}
