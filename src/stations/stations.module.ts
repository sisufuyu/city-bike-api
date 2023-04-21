import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StationsController } from './stations.controller';
import { StationsService } from './services/stations.service';
import { StationSchema, Station } from './schemas/station.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }])],
  controllers: [StationsController],
  providers: [StationsService],
})
export class StationsModule {}
