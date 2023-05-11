export const stations = [
  {
    id: 1,
    name: "Kaivopuisto",
    address: "Meritori 1",
    city: "",
    capacities: 30,
    x: 24.95021147,
    y: 60.15536962, 
  },
  {
    id: 2,
    name: "Laivasillankatu",
    address: "Laivasillankatu 14",
    city: "",
    capacities: 12,
    x: 24.95650977,
    y: 60.16098907,
  },
];

export const station = {
  id: 6,
  name: "Ahertajantie",
  address: "Ahertajantie 5",
  city: "Espoo",
  capacities: 14,
  x: 24.805100018876264,
  y: 60.18093310527152, 
};

export const journeys = [
  {
    departure: new Date('2021-05-01T17:31:10.000Z'),
    return: new Date('2021-05-01T18:35:18.000Z'),
    departureStationId: 1,
    returnStationId: 2,
    coveredDistance: 618,
  },
  {
    departure: new Date('2021-05-30T20:30:45.000+00:00'),
    return: new Date('2021-05-31T12:45:49.000+00:00'),
    departureStationId: 2,
    returnStationId: 1,
    coveredDistance: 1000,
  },
];

export const journey = {
  departure: new Date("2021-05-31T20:56:11.000Z"),
  return: new Date("2021-05-31T21:02:02.000Z"),
  departureStationId: 1,
  returnStationId: 2,
  coveredDistance: 800,
};

