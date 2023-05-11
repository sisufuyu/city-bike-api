import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { JourneysModule } from '../../src/journeys/journeys.module';
import { Journey } from 'src/journeys/schemas/journey.schema';

const journey = {
  departure: new Date("2021-05-31T20:56:11.000Z"),
  return: new Date("2021-05-31T21:02:02.000Z"),
  departureStationId: 1,
  returnStationId: 2,
  coveredDistance: 618,
};

describe('Journeys', () => {
  let app: INestApplication;
  let module: TestingModule;
  let newJourney: Journey;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JourneysModule,
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: process.env.MONGODB_TEST_URI,
          }),
        }),
      ],
    }).compile();

    app = module.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true
      })
    );

    await app.init();
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await app.close();
  });

  it('GET /journeys', async () => {
    const response = await request(app.getHttpServer())
      .get('/journeys')
    
    expect(response.status).toEqual(200);
  });

  describe('/POST journeys', () => {
    it('create a journey successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/journeys')
        .send(journey);

      expect(response.status).toEqual(201);
      newJourney = response.body;

      expect(newJourney.departureStationId).toEqual(1);
    });

    it('create a journey failed if body value not valid', async () => {
      return request(app.getHttpServer())
        .post('/journeys')
        .send({...journey, departure: ""})
        .expect(400);
    })
  })

  describe('GET /journeys/:id', () => {
    it('find a journey successfully if exists', () => {
      return request(app.getHttpServer())
        .get('/journeys/645527f5a2afa3ac60a6caf4')
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

  it('DELETE /journeys', () => {
    const id = newJourney._id;
    return request(app.getHttpServer())
      .delete(`/journeys/${id}`)
      .expect(200);
  })
})