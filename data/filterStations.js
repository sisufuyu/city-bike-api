import { createWriteStream, createReadStream } from 'fs';
import * as csv from 'fast-csv';
import validStation from './validStation.js';

const filterStations = async (inputFile, outputFile) => {
  const writeStream = createWriteStream(outputFile, { flags : 'w', encoding: 'utf8' });
  const header = 'id,name,address,city,capacities,x,y\n';
  
  writeStream.write(header);

  const parser = csv.parse({ headers: true });

  createReadStream(inputFile)
    .pipe(parser)
    .on('data', function(row) {
      const valid = validStation(row);

      if (valid) {
        let data = [];

        for (const key in row) {
          const values = row[key].split(',');
          if (values.length > 1) {
            data.push(`"${row[key]}"`);
          } else {
            data.push(row[key]);
          }
        }
        
        const line = data.join(',') + '\n';
        writeStream.write(line);
      }
    })
    .on("error", function (error) {
        console.log(error.message);
    })
    .on("end", function () {
        console.log("finished");
    });
}

export default filterStations;