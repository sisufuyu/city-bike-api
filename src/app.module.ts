import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JourneysModule } from './journeys/journeys.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StationsModule } from './stations/stations.module';

@Module({
  imports: [
    JourneysModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    StationsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
