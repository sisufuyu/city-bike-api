import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JourneysService } from './journeys.service';
import { Journey } from '../schemas/journey.schema';
import { JourneySchema } from '../schemas/journey.schema';

const data = [
  {
    departure: new Date('2021-05-31T20:31:10.000Z'),
    return: new Date('2021-05-31T20:35:18.000Z'),
    departureStationId: 555,
    departureStationName: 'Kalevalantie',
    returnStationId: 511,
    returnStationName: 'Sateentie',
    coveredDistance: 618,
    duration: 244
  },
  {
    departure: new Date('2021-05-31T20:30:45.000+00:00'),
    return: new Date('2021-06-01T12:45:49.000+00:00'),
    departureStationId: 573,
    departureStationName: 'Urheilupuisto (M)',
    returnStationId: 511,
    returnStationName: 'Sateentie',
    coveredDistance: 2834,
    duration: 58499
  }
];

describe('JourneysService', () => {
  let service: JourneysService;
  let module: TestingModule;
  let mongod: MongoMemoryServer;
  let journey1: Journey;
  let journey2: Journey;

  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    module = await Test.createTestingModule({
      providers: [JourneysService],
      imports: [
        MongooseModule.forFeature([
          { name: Journey.name, schema: JourneySchema }
        ]),
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: mongod.getUri()
          })
        })
      ]
    }).compile();

    service = module.get<JourneysService>(JourneysService);

    journey1 = await service.create(data[0]);
    journey2 = await service.create(data[1]);
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return journeys with pagination info', async () => {
    const journeys = await service.findAll({ limit: 10, offset: 0 });
    expect(journeys).toHaveProperty('total', 2);
    expect(journeys.results[0]).toHaveProperty(
      'departureStationId',
      journey1.departureStationId
    );
    expect(journeys.results[1]).toHaveProperty(
      'departureStationId',
      journey2.departureStationId
    );
  });

  it('should create a new journey', async () => {
    const journey = {
      departure: new Date('2021-07-31T20:51:37.000+00:00'),
      return: new Date('2021-07-31T20:56:24.000+00:00'),
      departureStationId: 26,
      departureStationName: 'Kamppi (M)',
      returnStationId: 35,
      returnStationName: 'Cygnaeuksenkatu',
      coveredDistance: 1117,
      duration: 286
    };

    const newJourney = await service.create(journey);
    expect(newJourney).toHaveProperty(
      'departureStationId',
      journey.departureStationId
    );
    expect(newJourney).toHaveProperty('duration', journey.duration);
  });

  it('should remove a journey', async () => {
    const journey = await service.remove(journey1._id);
    expect(journey).toHaveProperty('departureStationName', 'Kalevalantie');
  });

  it('should find journeys by departure station ID', async () => {
    const journeys = await service.findByDepartureStation(555);
    expect(journeys).toHaveLength(1);
  });

  it('should find journeys by return station ID', async () => {
    const journeys = await service.findByReturnStation(511);
    expect(journeys).toHaveLength(2);
  });
});
