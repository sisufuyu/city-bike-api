export interface Journey {
  id: string;
  departure: Date;
  return: Date;
  departureStationId: Number;
  departureStationName: String;
  returnStationId: Number;
  returnStationName: String;
  coveredDistance: Number;
  duration: Number;
}