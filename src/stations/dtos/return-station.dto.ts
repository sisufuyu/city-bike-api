import { Station } from "../schemas/station.schema";

export interface ReturnStationDTO {
  total: number;
  limit: number;
  offset: number;
  results: Station[];
}

export class StationWIthJourneyInfo extends Station {
  departureFrom: number;
  returnTo: number;
}