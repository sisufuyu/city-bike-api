import { Journey } from '../schemas/journey.schema';

export interface ReturnJourneyDTO {
  total: number;
  limit: number;
  offset: number;
  results: Journey[];
}
