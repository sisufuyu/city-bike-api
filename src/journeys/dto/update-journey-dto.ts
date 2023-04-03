import { PartialType } from '@nestjs/mapped-types';
import { CreateJourneyDto } from './create-journey-dto';

export class UpdateJourneyDto extends PartialType(CreateJourneyDto) {
  readonly departure?: Date;
  readonly return?: Date;
  readonly departureStationId?: number;
  readonly departureStationName?: string;
  readonly returnStationId?: number;
  readonly returnStationName?: string;
  readonly coveredDistance?: number;
  readonly duration?: number;
}
