import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journey } from './schemas/journey.schema';
import mongoose, { Model } from 'mongoose';
import { CreateJourneyDto } from './dto/create-journey.dto';
import { UpdateJourneyDto } from './dto/update-journey.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class JourneysService {
  constructor(@InjectModel(Journey.name) private journeyModel: Model<Journey>){}

  async findAll(paginationQuery: PaginationQueryDto) {
    let { offset, limit } = paginationQuery;
    console.log(offset,limit);

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
