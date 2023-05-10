import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { StationsModule } from '../../src/stations/stations.module';
import { Station } from '../../src/stations/schemas/station.schema';

const station = {
  id: 6,
  name: "Ahertajantie",
  address: "Ahertajantie 5",
  city: "Espoo",
  capacities: 14,
  x: 24.805100018876264,
  y: 60.18093310527152, 
}

describe('Station', () => {
  let app: INestApplication;
  let module: TestingModule;
  let newStation: Station;

  beforeAll(async () => {
    module = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot(),
          StationsModule,
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

  it('GET /stations', () => {
    return request(app.getHttpServer())
      .get('/stations')
      .expect(200);
  });

  describe('GET /journeys/:id', () => {
    it('find a station successfully if it exists', () => {
      return request(app.getHttpServer())
        .get('/stations/645528efa2afa3ac60a6cb0e')
        .expect(200);
    });

    it('return 404 for nonexisting station', () => {
      return request(app.getHttpServer())
        .get('/stations/645528efa2afa3ac60a6cb09')
        .expect(404);
    });

    it('return 400 if station id is not valid', () => {
      return request(app.getHttpServer())
        .get('/stations/1')
        .expect(400);
    });
  })

  describe('POST /stations', () => {
    it('create a new station successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/stations')
        .send(station);

      console.log(response);
      expect(response.status).toEqual(201);

      newStation = response.body;
      expect(newStation).toHaveProperty('name', 'Ahertajantie');
    });

    it('create a new station failed if same station ID already exists', async () => {
      await request(app.getHttpServer())
        .post('/stations')
        .send({ ...station, id: 1 })
        .expect(400);
    });

    it('create a new station failed if body value invalid',async () => {
      await request(app.getHttpServer())
        .post('/stations')
        .send({ ...station, id: 1 })
        .expect(400);
    });
  });

  it('DELETE /stations', () => {
    const id = newStation._id;

    return request(app.getHttpServer())
    .delete(`/stations/${id}`)
    .expect(200);
  });
})