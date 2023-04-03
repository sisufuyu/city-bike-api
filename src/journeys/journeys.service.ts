import { Injectable, NotFoundException } from '@nestjs/common';
import { Journey } from './interfaces/journey.interface';

@Injectable()
export class JourneysService {
  private journeys: Journey[] = [
    {
      id: '6428d3e3c025e3f8bf9322f0',
      departure: new Date('2021-05-31T20:57:25.000+00:00'),
      return: new Date('2021-05-31T21:05:46.000+00:00'),
      departureStationId: 94,
      departureStationName: "Laajalahden aukio",
      returnStationId: 100,
      returnStationName: "Teljäntie",
      coveredDistance: 2043,
      duration: 500,
    }
  ];

  findAll() {
    return this.journeys;
  }

  findOne(id: string) {
    const journey = this.journeys.find(journey => journey.id === id);

    if (!journey) {
      throw new NotFoundException(`Journey #${id} not found`);
    }

    return journey;
  }

  create(createJourneyDTO: Journey) {
    this.journeys.push(createJourneyDTO);
  }

  update(id: string, updateJourneyDTO: Journey) {
    const exist = this.findOne(id);
    
    if (exist) {
        //update the existing journey
    }
  }

  remove(id: string) {
    const index = this.journeys.findIndex(journey => journey.id === id);

    if (index >=0) {
      this.journeys.splice(index, 1);
    }
  }

}
