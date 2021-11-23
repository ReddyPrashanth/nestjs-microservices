import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const { data, total, query } = response;
        const { limit, page } = query;
        const itemCount = data.length;
        return {
          data,
          meta: {
            totalItems: total,
            itemCount,
            limit,
            page,
          },
        };
      }),
    );
  }
}
