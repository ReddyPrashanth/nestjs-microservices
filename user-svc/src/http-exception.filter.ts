import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { throwError, Observable } from 'rxjs';

@Catch(RpcException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, _host: ArgumentsHost): Observable<any> {
    return throwError(exception.getError());
  }
}
