import moment from 'moment';

export const canJoinEvent = (
  join_end_date: string,
  occupancy: number,
  thresholdOccupancy: number,
) => {
  const joinEndDateMoment = moment(join_end_date);

  const presentDateMoment = moment();

  const isAfterJoinEnd = presentDateMoment.isAfter(joinEndDateMoment);

  if (isAfterJoinEnd) {
    return false;
  }
  if (occupancy < thresholdOccupancy) {
    return true;
  }

  return false;
};

export const canLikeEvent = (like_end_date: string) => {
  const date = moment(like_end_date);
  const present_date = moment();
  if (date.diff(present_date, 'hours') > 0) {
    return true;
  }

  return false;
};
