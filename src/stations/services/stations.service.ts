import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Station } from '../schemas/station.schema';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { ReturnStationDTO } from '../dtos/return-station.dto';

@Injectable()
export class StationsService {
  constructor(@InjectModel(Station.name) private stationModel: Model<Station>) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<ReturnStationDTO> {
    let { limit, offset } = paginationQuery;

    if(!limit) limit = 10;
    if(!offset) offset = 0;

    const total = await this.stationModel.countDocuments().exec();

    const results = await this.stationModel.find().skip(offset).limit(limit).exec();

    return {
      total,
      limit,
      offset,
      results
    }
  }
}
