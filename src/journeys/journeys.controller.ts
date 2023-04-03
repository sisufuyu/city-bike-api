import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  Query,
} from '@nestjs/common';
import { Journey } from './interfaces/journey.interface';
import { JourneysService } from './journeys.service';

@Controller('journeys')
export class JourneysController {
  constructor(private journeyService: JourneysService) {}
  
  @Get()
  findAll(@Query() paginationQuery): Journey[] {
    // const { limit, offset } = paginationQuery
    return this.journeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Journey {
    return this.journeyService.findOne(id);
  }

  @Post()
  create(@Body() body) {
    return this.journeyService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.journeyService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id:string) {
    return this.journeyService.remove(id);
  }
}
