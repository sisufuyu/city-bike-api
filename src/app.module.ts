import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JourneysController } from './journeys/journeys.controller';
import { JourneysService } from './journeys/journeys.service';

@Module({
  imports: [],
  controllers: [AppController, JourneysController],
  providers: [AppService, JourneysService],
})
export class AppModule {}
