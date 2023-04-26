import { IsDate, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateJourneyDto {
  @IsDate({ message: 'Departure time is not valid Date' })
  @Type(() => Date)
  readonly departure: Date;

  @IsDate({ message: 'Return time is not valid Date' })
  @Type(() => Date)
  readonly return: Date;

  @IsInt()
  @Min(1)
  readonly departureStationId: number;

  readonly departureStationName: string;

  @IsInt()
  @Min(1)
  readonly returnStationId: number;

  readonly returnStationName: string;

  @IsInt()
  @Min(10, { message: 'Covered distance is too short' })
  readonly coveredDistance: number;

  readonly duration: number;
}
