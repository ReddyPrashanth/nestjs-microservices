import { HealthModule } from './../health/health.module';
import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';

@Module({
  imports: [HealthModule],
  providers: [SchedulingService],
})
export class SchedulingModule {}
