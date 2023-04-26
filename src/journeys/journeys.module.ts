import { Module, forwardRef } from '@nestjs/common';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './services/journeys.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Journey, JourneySchema } from './schemas/journey.schema';
import { StationsModule } from 'src/stations/stations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Journey.name, schema: JourneySchema }]),
    forwardRef(() => StationsModule)
  ],
  controllers: [JourneysController],
  providers: [JourneysService],
  exports: [JourneysService]
})
export class JourneysModule {}
