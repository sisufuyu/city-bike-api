import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  offset: number;

  @IsOptional()
  @Type(() => Number)
  limit: number;
}
