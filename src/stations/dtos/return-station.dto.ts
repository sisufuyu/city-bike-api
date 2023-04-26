import { Station } from '../schemas/station.schema';

export interface ReturnStationDTO {
  total: number;
  limit: number;
  offset: number;
  results: Station[];
}
