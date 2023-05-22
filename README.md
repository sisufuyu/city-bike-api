# Helsinki City Bike Api

## Description

This is a REST API for Helsinki city bike. This project is for [Solita Dev Academy pre-assignment](https://github.com/solita/dev-academy-2023-exercise).

## Built With

This project is built with following technologies:
* [Nest.js](https://nestjs.com/)
* [MongoDB](https://www.mongodb.com/)

## Prerequisites

To run the project on your local environment, Please make sure that Node.js (version >= 12, except for v13) is installed on your operating system.

## Data Import

There are many ways to import data in MongoDB, and I use MongoDB Compass for this puerpose. 
1. Create a database with name 'helsinki-city-bike-app', https://www.mongodb.com/basics/create-database
2. Create two collections 'journeys' and 'stations' in the database.
3. [Download and install MongoDB Compass](https://www.mongodb.com/docs/compass/master/install/?_ga=2.239545610.828859960.1684698811-745070963.1679086569&_gac=1.258739832.1684761270.CjwKCAjwpayjBhAnEiwA-7ena6WR8oZ9nKF3443BeDyPspH4lc_IhzG8P4hl2fcriAVC_aBjowyPyRoCdrYQAvD_BwE)
4. Connect to MongoDB, https://www.mongodb.com/docs/compass/master/connect/
5. Import Data, https://www.mongodb.com/docs/compass/current/import-export/

## Installation

1. Clone the repo
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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
