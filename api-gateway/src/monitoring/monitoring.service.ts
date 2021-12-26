import { RpcExceptionResponseDto } from './../dtos/base.dto';
import { catchError } from 'rxjs';
import { ServiceDto } from './dtos/monitoring.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class MonitoringService {
  constructor(
    @Inject('MONITORING_SERVICE') private readonly client: ClientProxy,
  ) {}

  healthCheck() {
    return this.client.send({ cmd: 'health_check' }, {});
  }

  createService(dto: ServiceDto) {
    return this.client.send({ cmd: 'create_service' }, dto).pipe(
      catchError((err: RpcExceptionResponseDto) => {
        throw new HttpException(err.message, err.status);
      }),
    );
  }
}
