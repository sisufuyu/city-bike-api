const filterJourneys = require('./filterJourneys.js');
const filterStations = require('./filterStations.js');

filterJourneys(__dirname + '/2021-05.csv', __dirname + '/2021-05-filter.csv');
// filterJourneys(__dirname + '/2021-06.csv', __dirname + '/2021-06-filter.csv');
// filterJourneys(__dirname + '/2021-07.csv', __dirname + '/2021-07-filter.csv');

filterStations(__dirname + '/Helsinki-bike-stations.csv', __dirname + '/Helsinki-bike-stations-filter.csv');