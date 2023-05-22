import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JourneysModule } from './journeys/journeys.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { StationsModule } from './stations/stations.module';
import { TestModule } from './testing/testing.module';

@Module({
  imports: [
    JourneysModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.NODE_ENV==='test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI),
    StationsModule,
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
