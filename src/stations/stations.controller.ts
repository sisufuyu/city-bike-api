import { Controller, Get, Param, Query } from '@nestjs/common';

import { StationsService } from './services/stations.service';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { JourneysService } from '../journeys/services/journeys.service';
import { countAvg } from 'src/utils/helper.util';

@Controller('stations')
export class StationsController {
  constructor(private stationService: StationsService, private journeysService: JourneysService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.stationService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const station = await this.stationService.findOne(id);

    const journeysdepartureFrom = await this.journeysService.findByDepartureStation(station.id);

    const departureFrom = countAvg(journeysdepartureFrom);

    const journeysreturnTo = await this.journeysService.findByReturnStation(station.id);

    const returnTo = countAvg(journeysreturnTo);

    return {
      ...station.toJSON(),
      departureFrom,
      returnTo,
    }
  }
}
