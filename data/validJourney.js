const validJourney = (row) => {
  let valid = true;
  const departureTime = Date.parse(row.departure);
  const returnTime = Date.parse(row.return);
  const departureStationId = parseInt(row.departureStationId);
  const returnStationId = parseInt(row.returnStationId);
  const coveredDistance = parseInt(row.coveredDistance);
  const duration = parseInt(row.duration);

  if (isNaN(departureTime) || isNaN(returnTime)) {
    valid = false;
    return valid;
  }

  if (departureTime > returnTime) {
    valid = false;
    return valid;
  }

  if (isNaN(departureStationId) || isNaN(returnStationId)) {
    valid = false;
    return valid;
  }

  if (departureStationId <= 0 || returnStationId <= 0) {
    valid = false;
    return valid;
  }

  if (isNaN(coveredDistance) || isNaN(duration)) {
    valid = false;
    return valid;
  }

  if (coveredDistance <= 10 || duration <= 10) {
    valid = false;
    return valid;
  }

  return valid;
}

module.exports = validJourney;