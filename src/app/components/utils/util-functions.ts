/** Extract and return the year from a date string with the format 'DD MM YYYY'. */
export function getYearFromDate(date: string) {
  const splitDate = date.split(' ');
  return splitDate[2];
}
