import { IsString, IsDate, IsInt, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJourneyDto {
  @IsDate()
  @Type(() => Date)
  readonly departure: Date;

  @IsDate()
  @Type(() => Date)
  readonly return: Date;

  @IsInt()
  readonly departureStationId: number;

  @IsString()
  readonly departureStationName: string;

  @IsInt()
  readonly returnStationId: number;

  @IsString()
  readonly returnStationName: string;

  @IsNumber()
  readonly coveredDistance: number;

  @IsNumber()
  readonly duration: number;
}
