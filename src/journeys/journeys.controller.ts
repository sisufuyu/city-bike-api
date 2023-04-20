import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { JourneysService } from './services/journeys';

@Controller('journeys')
export class JourneysController {
  constructor(private journeyService: JourneysService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.journeyService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.journeyService.findOne(id);
  }

  @Post()
  create(@Body() createJourneyDto: CreateJourneyDto) {
    return this.journeyService.create(createJourneyDto);
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
