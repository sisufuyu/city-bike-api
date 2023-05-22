import { Controller, Post } from "@nestjs/common";
import { StationsService } from "src/stations/services/stations.service";
import { JourneysService } from "src/journeys/services/journeys.service";

@Controller('testing')
export class TestController {
  constructor(
    private stationService: StationsService,
    private journeysService: JourneysService
  ) {}    

  @Post('/reset')
  async reset() {
    if (process.env.NODE_ENV==='test') {
      await this.journeysService.deleteMany();
      await this.stationService.deleteMany();
    }
  }
}