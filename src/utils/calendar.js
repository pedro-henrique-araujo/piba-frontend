export function getDates(start, end) {
  const currentDate = new Date(start);
  const dates = [];
  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function getLastSundayBasedOn(date) {
  return getDayOfWeek({ date, day: 0 });
}

export function getNextSaturdayBasedOn(date) {
  return getDayOfWeek({ date, day: 6 });
}

export function getLastDayOfMonth(date) {
  const output = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  output.setDate(output.getDate() - 1);
  return output;
}

export function getDayOfWeek({ date, day }) {
  const output = new Date(date);

  output.setDate(output.getDate() - output.getDay() + day);

  return output;
}

export function dateOnlyEquals(date1, date2) {
  return date1.toDateString() == date2.toDateString();
}
