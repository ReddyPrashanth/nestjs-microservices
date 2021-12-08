import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class RpcExceptionResponseDto {
  status: number;

  message: string;
}

export class PaginatedQueryDto {
  @IsInt()
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Type(() => Number)
  page: number;
}
