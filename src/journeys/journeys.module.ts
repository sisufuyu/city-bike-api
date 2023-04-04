import { Module } from '@nestjs/common';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Journey, JourneySchema } from './schemas/journey.schema';

@Module({ 
  imports: [MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }])],
  controllers: [JourneysController], 
  providers: [JourneysService] 
})
export class JourneysModule {}
