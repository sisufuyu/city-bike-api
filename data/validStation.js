const validStation = (row) => {
  let valid = true;
  const id = parseInt(row.id);
  const capacities = parseInt(row.capacities);
  const x = parseFloat(row.x);
  const y = parseFloat(row.y);

  if (isNaN(id) || id <= 0) {
    valid = false;
    return valid;
  }

  if (isNaN(capacities) || capacities <= 0) {
    valid = false;
    return valid;
  }

  if (isNaN(x) || isNaN(x)) {
    valid = false;
    return valid;
  }

  if(x < -180 || x > 180 || y < -90 || y > 90) {
    valid = false;
    return valid;
  }

  return valid;
}

module.exports = validStation;