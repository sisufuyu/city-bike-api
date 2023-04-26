import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Station } from '../schemas/station.schema';
import { PaginationQueryDto } from 'src/dtos/pagination-query.dto';
import { ReturnStationDTO } from '../dtos/return-station.dto';
import { CreateStationDTO } from '../dtos/create-station.dto';

@Injectable()
export class StationsService {
  constructor(@InjectModel(Station.name) private stationModel: Model<Station>) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<ReturnStationDTO> {
    try {
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
    } catch (err) {
      throw new BadRequestException('Find stations failed');
    }
  }

  async findOne(id: string): Promise<Station> {
    try {
      const station = await this.stationModel.findById(id).exec();

      if (!station) {
        throw new NotFoundException(`Station #${id} not found`);
      }

      return station;
    } catch (err) {
      throw new NotFoundException(`Station #${id} not found`);
    }
  }

  async findByID(ID: number): Promise<Station> {
    try{
      const station = await this.stationModel.findOne({ id: ID }).exec();

      if (!station) {
        throw new NotFoundException(`Station with id ${ID} not found`);
      }
      
      return station;
    }catch (err) {
      throw new NotFoundException(`Station with id ${ID} not found`);
    }
  }

  async create(createStationDTO: CreateStationDTO): Promise<Station> {
    try{
      const station = new this.stationModel(createStationDTO);
      return await station.save();
    } catch (err) {
      if(err instanceof MongoServerError) {
        if(err.code === 11000) {
          throw new BadRequestException(`Station ID cannot be duplicate`);
        }
      }
      throw new BadRequestException('Create new station failed');
    }
  }

  async remove(id: string): Promise<Station> {
    try {
      const station = await this.stationModel.findByIdAndDelete(id);
      
      if (!station) {
        throw new NotFoundException(`Station #${id} not found`);
      }
      
      return station;
    } catch (err) {
      throw new NotFoundException(`Station #${id} not found`);
    }
  }
}
