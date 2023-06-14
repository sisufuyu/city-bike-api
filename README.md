# Helsinki City Bike API

This is a REST API for Helsinki city bike. This project is for [Solita Dev Academy pre-assignment](https://github.com/solita/dev-academy-2023-exercise).

## Built With

This project is built with following technologies:
* ![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b.svg?logo=mongodb&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC.svg?logo=typescript&logoColor=white)

## Prerequisites

To run the project on your local environment, Please make sure that Node.js (version >= 12, except for v13) is installed on your operating system.

## Data Preparation

### Dataset Testing
The original journeys data are ***2021-05.csv***, ***2021-06.csv***, ***2021-07.csv***, and the original stations data are ***Helsinki-bike-stations.csv***.  
The validated data are ***2021-05-filter.csv***, ***2021-06-filter.csv***, ***2021-07-filter.csv***, ***Helsinki-bike-stations.csv***.  
All of them are under ***data*** folder. 

* validJourney.js file: a journey validation function
   * It should reject a journey where departure time is not a parseable DateTime (and the same for an arrival time)
   * It should reject a journey where arrival happens before departure
   * It should reject if a departure station id is not a positive integer (and the same with arrival and length of the trip)
   * It should accept a valid trip
   * It should reject a trip that is less than 10 seconds (this came from the pre-assignment)
* filterJourneys.js file: a filterJourneys function which filters the journeys data and returns validated journeys data
* validStation.js file: a station validation function
   * It should reject if station id is not a positive integer
   * It should reject if station x is not in the range bewteen -180 ~ 180
   * It should reject if station y is not in the range bewteen -90 ~ 90
* filterStations.js file: a filterStations function which filters the stations data and returns validated stations data

To test and validate dataset, run:
```
npm run data/index.js
```

### Data Import

There are many ways to import data in MongoDB, and I use MongoDB Compass for this purpose. 
1. [Create a database](https://www.mongodb.com/basics/create-database) with name 'helsinki-city-bike-app'
2. Create two collections 'journeys' and 'stations' in the database.
3. [Download and install MongoDB Compass](https://www.mongodb.com/docs/compass/master/install/?_ga=2.239545610.828859960.1684698811-745070963.1679086569&_gac=1.258739832.1684761270.CjwKCAjwpayjBhAnEiwA-7ena6WR8oZ9nKF3443BeDyPspH4lc_IhzG8P4hl2fcriAVC_aBjowyPyRoCdrYQAvD_BwE)
4. [Connect to MongoDB](https://www.mongodb.com/docs/compass/master/connect/) in MongoDB Compass 
5. [Import Data](https://www.mongodb.com/docs/compass/current/import-export/)  
**Note**: 
* The fields and types of journeys collection when importing: 
    * departure: Date
    * return: Date
    * departureStationId: Number
    * departureStationName: String
    * returnStationId: Number
    * returnStationName: String
    * coveredDistance: Number
    * duration: Number
* The fields and types of journeys collection when importing: 
    * id: Number
    * name: String
    * address: String
    * city: String
    * capacities: Number
    * x: Number
    * y: Number

## Installation

1. Clone this repository
2. Create .env file in your root directory
```
MONGODB_URI=mongodb+srv://<your username>:<your password>@cluster0.sk6lf.mongodb.net/<database name>
MONGODB_TEST_URI=mongodb+srv://<your username>:<your password>@cluster0.sk6lf.mongodb.net/<test database name>
```
3. Install NPM packages

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
After the server has started you should be able to access it through [http://localhost:4000/](http://localhost:4000/)

## Endpoints

### Journeys

1. GET '/journeys?offset=&limit=', find journeys with pagination information offset (default 0) and limit (default 10)
2. GET '/journeys/:id', find one journey with id
3. POST '/journeys', create a new journey
4. DELETE '/journeys/:id', delete one journey with id

### Stations
1. GET '/stations?offset=&limit=', find stations with pagination information offset (default 0) and limit (default 10)
2. GET '/stations/:id', find one station with id
3. POST '/stations', create a new station
4. DELETE '/stations/:id', delete one station with id

### Testing
1.POST '/testing/reset', empty the database for front-end e2e test purpose only, it is useful only when *NODE_ENV* is test

## Test

### Unit Tests
There are unit tests for journeys and stations services, to run the unit tests:

```bash
$ npm run test
```

### E2E Tests for API endpoints
There are e2e tests for API endpoints also, to run the e2e tests:

```bash
$ npm run test:e2e
```

### E2E Tests for front-end
The testing module under src folder is for front-end e2e test, before running e2e tests in front-end, start the server in test mode:

```bash
$ npm run start:test
```

It will set *NODE_ENV* to test and connect to MongoDB database with MONGODB_TEST_URI.  
