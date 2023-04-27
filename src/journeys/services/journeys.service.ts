import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Journey } from '../schemas/journey.schema';
import { Model, Error } from 'mongoose';
import { CreateJourneyDto } from '../dtos/create-journey.dto';
import { PaginationQueryDto } from '../../dtos/pagination-query.dto';
import { ReturnJourneyDTO } from '../dtos/return-journey.dto';

@Injectable()
export class JourneysService {
  constructor(
    @InjectModel(Journey.name) private journeyModel: Model<Journey>
  ) {}

  async findAll(
    paginationQuery: PaginationQueryDto
  ): Promise<ReturnJourneyDTO> {
    try {
      let { offset, limit } = paginationQuery;

      if (!offset) offset = 0;

      if (!limit) limit = 10;

      const total = await this.journeyModel.countDocuments().exec();

      const results = await this.journeyModel
        .find({})
        .skip(offset)
        .limit(limit)
        .exec();

      return {
        total,
        limit,
        offset,
        results
      };
    } catch (err) {
      throw new BadRequestException('Find journeys failed');
    }
  }

  async findOne(id: string): Promise<Journey> {
    try {
      const journey = await this.journeyModel.findById(id).exec();

      if (!journey) {
        throw new NotFoundException(`Journey #${id} not found`);
      }

      return journey;
    } catch (err) {
      if (err instanceof Error.CastError) {
        throw new BadRequestException(`Journey id #${id} is not valid`);
      }

      throw new NotFoundException(`Journey #${id} not found`);
    }
  }

  async create(createJourneyDTO: CreateJourneyDto): Promise<Journey> {
    try {
      const journey = new this.journeyModel(createJourneyDTO);
      return await journey.save();
    } catch (err) {
      throw new BadRequestException('Create new journey failed');
    }
  }

  async remove(id: string): Promise<Journey> {
    try {
      const journey = await this.journeyModel.findByIdAndDelete(id).exec();

      if (!journey) {
        throw new NotFoundException(`Journey #${id} not found`);
      }

      return journey;
    } catch (err) {
      if (err instanceof Error.CastError) {
        throw new BadRequestException(`Journey id #${id} is not valid`);
      }

      throw new NotFoundException(`Journey #${id} not found`);
    }
  }

  async findByDepartureStation(id: number): Promise<Journey[]> {
    try {
      return await this.journeyModel.find({ departureStationId: id }).exec();
    } catch (err) {
      throw new BadRequestException(
        `Find journey with departure station #${id} failed`
      );
    }
  }

  async findByReturnStation(id: number): Promise<Journey[]> {
    try {
      return await this.journeyModel.find({ returnStationId: id }).exec();
    } catch (err) {
      throw new BadRequestException(
        `Find journey with return station #${id} failed`
      );
    }
  }
}
