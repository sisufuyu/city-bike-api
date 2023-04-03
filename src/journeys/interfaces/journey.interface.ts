export interface Journey {
  id: string;
  departure: Date;
  return: Date;
  departureStationId: number;
  departureStationName: string;
  returnStationId: number;
  returnStationName: string;
  coveredDistance: number;
  duration: number;
}
