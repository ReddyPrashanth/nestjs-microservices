import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { RmqOptions, Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly microservice: MicroserviceHealthIndicator,
    private readonly http: HttpHealthIndicator,
    private readonly config: ConfigService,
  ) {}

  healthCheck() {
    const RMQ_URL: string = this.config.get('RMQ_URL');
    return this.health.check([
      async () => {
        return this.microservice.pingCheck<RmqOptions>('rmq', {
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
}
