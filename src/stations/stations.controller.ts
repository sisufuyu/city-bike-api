import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  Delete
} from '@nestjs/common';

import { StationsService } from './services/stations.service';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { JourneysService } from '../journeys/services/journeys.service';
import { countAvg } from '../utils/helper.util';
import { CreateStationDTO } from './dtos/create-station.dto';

@Controller('stations')
export class StationsController {
  constructor(
    private stationService: StationsService,
    private journeysService: JourneysService
  ) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.stationService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const station = await this.stationService.findOne(id);

    const journeysdepartureFrom =
      await this.journeysService.findByDepartureStation(station.id);

    const departureFrom = countAvg(journeysdepartureFrom);

    const journeysreturnTo = await this.journeysService.findByReturnStation(
      station.id
    );

    const returnTo = countAvg(journeysreturnTo);

    return {
      ...station.toJSON(),
      departureFrom,
      returnTo
    };
  }

  @Post()
  async create(@Body() createStationDTO: CreateStationDTO) {
    return await this.stationService.create(createStationDTO);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.stationService.remove(id);
  }
}
