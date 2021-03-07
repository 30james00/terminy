import React, { useState } from 'react';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { Day, DayValue } from 'react-modern-calendar-datepicker';

function App() {
  const [start, changeStart] = useState<DayValue>();

  return (
    <div className='container h-screen flex flex-col justify-center content-center'>
      <h1 className='text-center text-4xl'>Terminy</h1>
      <p>Wybierz datę poczatkową:</p>
      <div className='max-w-md'>
        <DatePicker value={start} onChange={changeStart} />
      </div>
      <div>
        <p>
          {start ? calculate(start).toString() : 'Wprowadz date poczatkowa'}
        </p>
      </div>
    </div>
  );
}

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

function calculate(start: Day) {
  let startDate: Date;
  startDate = new Date(start.year, start.month - 1, start.day);
  let endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 7);
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

export default App;
