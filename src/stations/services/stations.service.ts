import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Station } from '../schemas/station.schema';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { ReturnStationDTO, StationWIthJourneyInfo } from '../dtos/return-station.dto';
import { JourneysService } from '../../journeys/services/journeys.service';

@Injectable()
export class StationsService {
  constructor(
    @InjectModel(Station.name) private stationModel: Model<Station>,
    private journeysService: JourneysService
  ) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<ReturnStationDTO> {
    let { limit, offset } = paginationQuery;

    if(!limit) limit = 10;
    if(!offset) offset = 0;

    const total = await this.stationModel.countDocuments().exec();

    const results = await this.stationModel.find().sort({ id: 1 }).skip(offset).limit(limit).exec();

    return {
      total,
      limit,
      offset,
      results
    }
  }

  async findOne(id: string) {
    const station = await this.stationModel.findById(id).exec();

    if (!station) {
      throw new NotFoundException(`Station #${id} not found`);
    }

    const departureFrom = await this.journeysService.countByDepartureStation(station.id);

    const returnTo = await this.journeysService.countByReturnStation(station.id);

    return {
      ...station.toJSON(),
      departureFrom,
      returnTo
    }
  }
}
