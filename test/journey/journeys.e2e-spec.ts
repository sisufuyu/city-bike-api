import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { JourneysModule } from '../../src/journeys/journeys.module';
import { Journey } from '../../src/journeys/schemas/journey.schema';
import { StationsService } from '../../src/stations/services/stations.service';
import { stations, journeys, journey } from '../data';

describe('Journeys', () => {
  let app: INestApplication;
  let module: TestingModule;
  let mongod: MongoMemoryServer;
  let stationsService: StationsService;
  let journey1: Journey;
  let journey2: Journey;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    module = await Test.createTestingModule({
      imports: [
        JourneysModule,
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: mongod.getUri(),
          }),
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    stationsService = module.get<StationsService>(StationsService);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true
      })
    );

    await app.init();

    await stationsService.create(stations[0]);
    await stationsService.create(stations[1]);

    let response = await request(app.getHttpServer())
      .post('/journeys')
      .send(journeys[0]);
    
    journey1 = response.body;

    response = await request(app.getHttpServer())
      .post('/journeys')
      .send(journeys[1]);
    
    journey2 = response.body;
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });

  it('GET /journeys', async () => {
    const response = await request(app.getHttpServer())
      .get('/journeys');
    
    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('total', 2);
  });

  describe('GET /journeys/:id', () => {
    it('find a journey successfully if exists', () => {
      const id = journey1._id;
      return request(app.getHttpServer())
        .get(`/journeys/${id}`)
        .expect(200);
    });

    it('return 404 for nonexisting journey', () => {
      return request(app.getHttpServer())
        .get('/journeys/645527f5a2afa3ac60a6caf9')
        .expect(404);
    });

    it('return 400 if journey id is not valid', () => {
      return request(app.getHttpServer())
        .get('/journeys/1')
        .expect(400);
    });
  })

  describe('/POST journeys', () => {
    it('create a journey successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/journeys')
        .send(journey);

      expect(response.status).toEqual(201);
      expect(response.body).toHaveProperty('departureStationId', 1);
    });

    it('create a journey failed if body value not valid', async () => {
      return request(app.getHttpServer())
        .post('/journeys')
        .send({...journey, departure: ""})
        .expect(400);
    });
  })

  it('DELETE /journeys', () => {
    const id = journey2._id;
    return request(app.getHttpServer())
      .delete(`/journeys/${id}`)
      .expect(200);
  })
})