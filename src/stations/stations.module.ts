import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StationsController } from './stations.controller';
import { StationsService } from './services/stations.service';
import { StationSchema, Station } from './schemas/station.schema';
import { JourneysModule } from '../journeys/journeys.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }]), forwardRef(() => JourneysModule)],
  controllers: [StationsController],
  providers: [StationsService],
  exports: [StationsService],
})
export class StationsModule {}
