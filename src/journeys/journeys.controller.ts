import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateJourneyDto } from './dtos/create-journey.dto';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { UpdateJourneyDto } from './dtos/update-journey.dto';
import { JourneysService } from './services/journeys.service';
import { StationsService } from 'src/stations/services/stations.service';

@Controller('journeys')
export class JourneysController {
  constructor(private journeyService: JourneysService, private stationService: StationsService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.journeyService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeyService.findOne(id);
  }

  @Post()
  async create(@Body() createJourneyDto: CreateJourneyDto) {
    const departureTime = createJourneyDto.departure.valueOf();
    const returnTime = createJourneyDto.return.valueOf();

    if (returnTime < departureTime) {
      throw new BadRequestException('Return time should not be early than departure time');
    } 

    if ((returnTime - departureTime)/1000 < 10) {
      throw new BadRequestException('The trip is too short, should be longer than 10 seconds');
    }

    const departureStationId = createJourneyDto.departureStationId;    
    const departureStation = await this.stationService.findByID(departureStationId);
    const departureStationName = departureStation.name;

    const returnStationId = createJourneyDto.returnStationId;
    const returnStation = await this.stationService.findByID(returnStationId);
    const returnStationName = returnStation.name;

    return this.journeyService.create({ 
      ...createJourneyDto, 
      departureStationName, 
      returnStationName,
    });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateJourneyDtoDto: UpdateJourneyDto
  ) {
    return this.journeyService.update(id, updateJourneyDtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.journeyService.remove(id);
  }
}
