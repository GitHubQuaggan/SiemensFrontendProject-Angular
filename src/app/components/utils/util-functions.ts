export function getYearFromDate(date: string) {
  const splitDate = date.split(' ');
  return splitDate[2];
}
