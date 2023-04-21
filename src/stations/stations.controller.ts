import { Controller, Get, Query } from '@nestjs/common';

import { StationsService } from './services/stations.service';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';

@Controller('stations')
export class StationsController {
  constructor(private stationService: StationsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.stationService.findAll(paginationQuery);
  }
}
