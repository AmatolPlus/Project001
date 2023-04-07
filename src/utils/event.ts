export const canJoinEvent = (
  days: number,
  occupancy: number,
  thresholdOccupancy: number,
) => {
  if (occupancy < thresholdOccupancy) {
    return true;
  }
  if (days > 0) {
    return true;
  }
  return false;
};
