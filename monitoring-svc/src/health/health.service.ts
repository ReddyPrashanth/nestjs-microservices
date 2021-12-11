import { PostgresErrorCode } from './../database/postgres-error-code.enum';
import { ServiceDto } from './dtos/monitoring.dto';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Repository } from 'typeorm';
import { MonitoringEntity } from './entities/monitoring.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly config: ConfigService,
    @InjectRepository(MonitoringEntity)
    private repository: Repository<MonitoringEntity>,
  ) {}

  checkServiceStatus() {
    const RMQ_URL: string = this.config.get('RMQ_URL');
    return this.health.check([
      async () => {
        return this.microservice.pingCheck<RmqOptions>('queue', {
          transport: Transport.RMQ,
          options: {
            urls: [RMQ_URL],
          },
        });
      },
      async () =>
        this.http.pingCheck('apiGateway', this.config.get('API_GATEWAY_URL')),
    ]);
  }

  async healthCheck() {
    return await this.repository.find();
  }

  async updateServiceHealth(services: MonitoringEntity[]) {
    await this.repository.save(services);
  }

  async createService(dto: ServiceDto) {
    try {
      const service = this.repository.create(dto);
      const { id, name, description } = await service.save();
      return { id, name, description };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UNIQUE_KEY_VIOLATION) {
        throw new BadRequestException(`Service ${dto.name} is already taken`);
      }
      console.log(error);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
