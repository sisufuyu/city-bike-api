import path from 'path';
import { fileURLToPath } from 'url';
import filterJourneys from "./filterJourneys.js";
import filterStations from "./filterStations.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// filterJourneys(__dirname + '/2021-05.csv', __dirname + '/2021-05-filter.csv');
// filterJourneys(__dirname + '/2021-06.csv', __dirname + '/2021-06-filter.csv');
filterJourneys(__dirname + '/2021-07.csv', __dirname + '/2021-07-filter.csv');

// filterStations(__dirname + '/Helsinki-bike-stations.csv', __dirname + '/Helsinki-bike-stations-filter.csv');