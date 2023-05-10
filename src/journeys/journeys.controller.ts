import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  BadRequestException
} from '@nestjs/common';
import { CreateJourneyDto } from './dtos/create-journey.dto';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { JourneysService } from './services/journeys.service';
import { StationsService } from '../stations/services/stations.service';

@Controller('journeys')
export class JourneysController {
  constructor(
    private journeyService: JourneysService,
    private stationService: StationsService
  ) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.journeyService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.journeyService.findOne(id);
  }

  @Post()
  async create(@Body() createJourneyDto: CreateJourneyDto) {
    const departureTime = createJourneyDto.departure.valueOf();
    const returnTime = createJourneyDto.return.valueOf();

    if (returnTime < departureTime) {
      throw new BadRequestException(
        'Return time should not be early than departure time'
      );
    }

    const duration = (returnTime - departureTime) / 1000;

    if (duration < 10) {
      throw new BadRequestException(
        'The trip is too short, should be longer than 10 seconds'
      );
    }

    const departureStationId = createJourneyDto.departureStationId;
    const departureStation = await this.stationService.findByID(
      departureStationId
    );
    const departureStationName = departureStation.name;

    const returnStationId = createJourneyDto.returnStationId;
    const returnStation = await this.stationService.findByID(returnStationId);
    const returnStationName = returnStation.name;

    return this.journeyService.create({
      ...createJourneyDto,
      departureStationName,
      returnStationName,
      duration
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.journeyService.remove(id);
  }
}
