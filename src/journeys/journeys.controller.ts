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

@Controller('journeys')
export class JourneysController {
  @Get()
  findAll(@Query() paginationQuery): string {
    const { limit, offset } = paginationQuery
    return `This action returns all journeys, Limit ${limit}, offset ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a ${id} journey`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates a ${id} journey`;
  }

  @Delete(':id')
  remove(@Param('id') id:string) {
    return `This action deletes a ${id} journey`;
  }
}
