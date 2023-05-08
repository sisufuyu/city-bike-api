import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { StationsService } from './stations.service';
import { Station, StationSchema } from '../schemas/station.schema';

const data = [
  {
    id: 2,
    name: "Laivasillankatu",
    address: "Laivasillankatu 14",
    city: "",
    capacities: 12,
    x: 24.95650977,
    y: 60.16098907,
  },
  {
    id: 749,
    name: "Vallikatu",
    address: "Vallikatu 19",
    city: "Espoo",
    capacities: 24,
    x: 24.813871,
    y: 60.228463,
  }
]

describe('StationsService', () => {
  let service: StationsService;
  let module: TestingModule;
  let mongod: MongoMemoryServer;
  let station1: Station;
  let station2: Station;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    module = await Test.createTestingModule({
      providers: [StationsService],
      imports: [
        MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }]),
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: mongod.getUri()
          })
        })
      ]
    }).compile();

    service = module.get<StationsService>(StationsService);
    station1 = await service.create(data[0]);
    station2 = await service.create(data[1]);
  });

  afterEach(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return stations with pagination info', async () => {
    const stations = await service.findAll({offset: 0, limit: 10});
    expect(stations).toHaveProperty('total', 2);
    expect(stations.results[0]).toHaveProperty('id', station1.id);
    expect(stations.results[1]).toHaveProperty('id', station2.id);
  });

  it('should create a new station', async () => {
    const station = {
      id: 1,
      name: "Kaivopuisto",
      address: "Meritori 1",
      city: "",
      capacities: 30,
      x: 24.95021147,
      y: 60.15536962,
    }

    const newStation = await service.create(station);
    expect(newStation).toHaveProperty('id', 1);
  });

  it('should find a station', async () => {
    const station = await service.findOne(station1._id);

    expect(station).toHaveProperty('id', station1.id);
    expect(station).toHaveProperty('name', station1.name);
  });

  it('should remove a new station', async () => {
    const station = await service.remove(station1._id);

    expect(station).toHaveProperty('id', station1.id);
    expect(station).toHaveProperty('name', station1.name);
  });

  it('should find a station by ID', async () => {
    const station = await service.findByID(station1.id);

    expect(station).toHaveProperty('id', station1.id);
    expect(station).toHaveProperty('name', station1.name);
  });
});
