import { Journey } from 'src/journeys/schemas/journey.schema';

export const countAvg = (journeys: Journey[]) => {
  let count = 0;
  let sum = 0;

  if(journeys.length === 0) {
    return {
      avgDistance: 0,
      count,
    }
  }
  
  journeys.forEach(journey => {
    count ++;
    sum += journey.coveredDistance;
  })

  return {
    avgDistance: sum/count,
    count,
  }
}