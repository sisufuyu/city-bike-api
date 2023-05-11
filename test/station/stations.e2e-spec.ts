import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { StationsModule } from '../../src/stations/stations.module';
import { Station } from '../../src/stations/schemas/station.schema';

const stations = [
  {
    id: 1,
    name: "Kaivopuisto",
    address: "Meritori 1",
    city: "",
    capacities: 30,
    x: 24.95021147,
    y: 60.15536962, 
  },
  {
    id: 2,
    name: "Laivasillankatu",
    address: "Laivasillankatu 14",
    city: "",
    capacities: 12,
    x: 24.95650977,
    y: 60.16098907,
  },
]

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
  let mongod: MongoMemoryServer;
  let station1: Station;
  let station2: Station;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    module = await Test.createTestingModule({
        imports: [
          StationsModule,
          MongooseModule.forRootAsync({
            useFactory: () => ({
              uri: mongod.getUri(),
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

    let response = await request(app.getHttpServer())
      .post('/stations')
      .send(stations[0]);
    
    station1 = response.body;

    response = await request(app.getHttpServer())
      .post('/stations')
      .send(stations[1]);

    station2 = response.body;
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
    await app.close();
  });

  it('GET /stations', () => {
    return request(app.getHttpServer())
      .get('/stations')
      .expect(200);
  });

  describe('GET /journeys/:id', () => {
    it('find a station successfully if it exists', () => {
      const id = station1._id;
      return request(app.getHttpServer())
        .get(`/stations/${id}`)
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
  });

  describe('POST /stations', () => {
    it('create a new station successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/stations')
        .send(station);

      expect(response.status).toEqual(201);

      const newStation = response.body;
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
        .send({
          id: 7,
          name: "",
          address: "",
          city: "Espoo",
          capacities: 20,
          x: 24.805100018876264,
          y: 60.18093310527152, 
        })
        .expect(400);
    });
  });

  it('DELETE /stations', () => {
    const id = station2._id;

    return request(app.getHttpServer())
    .delete(`/stations/${id}`)
    .expect(200);
  });
})