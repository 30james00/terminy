import { Day } from "react-modern-calendar-datepicker";

function wielkanoc(year: number) {
  let a = 24;
  let b = 5;
  const ra = year % 19;
  const rb = year % 4;
  const rc = year % 7;
  const rd = (ra * 19 + a) % 30;
  const re = (2 * rb + 4 * rc + 6 * rd + b) % 7;
  if (rd + re < 10) return new Date(year, 2, rd + re + 22);
  else return new Date(year, 3, rd + re - 9);
}

function calculate(start: Day, amount: number, type: string) {
  let startDate: Date;
  startDate = new Date(start.year, start.month - 1, start.day);
  let endDate: Date;

  //calculate endDate given term type
  switch (type) {
    case 'day':
      endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * amount);
      break;
    case 'week':
      endDate = new Date(startDate.setDate(startDate.getDate() + amount * 7));
      break;
    case 'month':
      endDate = new Date(startDate.setMonth(startDate.getMonth() + amount));
      break;
    case 'year':
      endDate = new Date(
        startDate.setFullYear(startDate.getFullYear() + amount)
      );
      break;
    //radio must be unchecked - imposible?
    default:
      return startDate;
  }
  //move to next day if last day is non-labour day
  while (isHoliday(endDate)) {
    endDate = new Date(endDate.getTime() + 1000 * 60 * 60 * 24);
  }
  return endDate;
}

function isHoliday(date: Date) {
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const month = date.getMonth();
  //saturday, sunday -> zeslanie Ducha Swietego check redundant
  if (dayOfWeek === 0 || dayOfWeek === 6) return true;
  switch (month) {
    case 0: //styczen
      //nowy rok, trzech kroli
      if (day === 1 || day === 6) return true;
      break;
    case 4: //maj
      //majowka
      if (day === 1 || day === 3) return true;
      break;
    case 7: //sierpien
      //wnieboziecie NMP
      if (day === 15) return true;
      break;
    case 10: //listopad
      //wszystkich swietych, swieto niepodleglosci
      if (day === 1 || day === 11) return true;
      break;
    case 11: //grudzien
      //Boze narodzenie, sw. Szczepana
      if (day === 25 || day === 26) return true;
      break;
  }
  //caculate wielkanoc for desirable year;
  const wielkanocDay = wielkanoc(date.getFullYear());
  const poniedzialekWielkanocny = new Date(
    wielkanocDay.getTime() + 1000 * 60 * 60 * 24
  );
  const bozeCialo = new Date(wielkanocDay.getTime() + 1000 * 60 * 60 * 24 * 60);

  //wielkanoc is sunday -> check redundant , poniedzialek wielkanocny, Boze Cialo
  if (
    (day === poniedzialekWielkanocny.getDate() &&
      month === poniedzialekWielkanocny.getMonth()) ||
    (day === bozeCialo.getDate() && month === bozeCialo.getMonth())
  ) {
    return true;
  }

  return false;
}

export {calculate, isHoliday, wielkanoc}