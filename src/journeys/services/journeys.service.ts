import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journey } from '../schemas/journey.schema';
import { Model } from 'mongoose';
import { CreateJourneyDto } from '../dtos/create-journey.dto';
import { UpdateJourneyDto } from '../dtos/update-journey.dto';
import { PaginationQueryDto } from '../../dtos/pagination-query.dto';
import { ReturnJourneyDTO } from '../dtos/return-journey.dto';

@Injectable()
export class JourneysService {
  constructor(@InjectModel(Journey.name) private journeyModel: Model<Journey>){}

  async findAll(paginationQuery: PaginationQueryDto): Promise<ReturnJourneyDTO> {
    let { offset, limit } = paginationQuery;

    if(!offset) offset = 0;

    if(!limit) limit = 10;

    const total = await this.journeyModel.countDocuments().exec();

    const results = await this.journeyModel.find({}).skip(offset).limit(limit).exec();

    return {
      total,
      limit,
      offset,
      results
    }
  }

  async findOne(id: string): Promise<Journey> {
    const journey = await this.journeyModel.findById(id).exec();

    if (!journey) {
      throw new NotFoundException(`Journey #${id} not found`);
    }

    return journey;
  }

  async create(createJourneyDTO: CreateJourneyDto): Promise<Journey> {
    const journey = new this.journeyModel(createJourneyDTO);
    return journey.save();
  }

  async update(id: string, updateJourneyDTO: UpdateJourneyDto): Promise<Journey> {
    const newJourney = await this.journeyModel
      .findByIdAndUpdate(id, { $set: updateJourneyDTO }, { new: true })
      .exec();

    if (!newJourney) {
      throw new NotFoundException(`Journey #${id} not found`);
    }

    return newJourney;
  }

  async remove(id: string) {
    return this.journeyModel.findByIdAndDelete(id).exec();
  }
}
