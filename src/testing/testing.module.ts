import { Module, forwardRef } from '@nestjs/common';
import { JourneysModule } from '../journeys/journeys.module';
import { StationsModule } from 'src/stations/stations.module';
import { TestController } from './testing.controller';

@Module({
  imports: [
    forwardRef(() => JourneysModule),
    forwardRef(() => StationsModule),
  ],
  controllers: [TestController],
  providers: [],
  exports: []
})
export class TestModule {}