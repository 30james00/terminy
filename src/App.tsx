import React, { useState } from 'react';

import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker, { DayValue } from 'react-modern-calendar-datepicker';
import { calculate } from './helpers/calculatios';
import Output from './components/Output';
import InvalidDataMessage from './components/InvalidDataMessage';

function App() {
  const [start, changeStart] = useState<DayValue>();
  const [type, changeType] = useState('day');
  const [amount, changeAmount] = useState(14);

  return (
    <div className='container h-screen flex flex-col place-content-center place-items-center'>
      <h1 className='mb-4 text-4xl font-black'>Terminy</h1>
      <p className='mb-1'>Wybierz datę poczatkową:</p>
      <div className='mb-2'>
        <label>
          <DatePicker value={start} onChange={changeStart} />
        </label>
      </div>
      <form className='flex flex-col'>
        <p className='mb-1'>{'Ustaw parametry terminu:'}</p>
        <label>
          {'Ilość:'}
          <input
            className='ml-1 border'
            value={amount}
            onChange={(event) => changeAmount(parseInt(event.target.value))}
            type='number'
            min='1'
            max='100'
            name='number'
            id='number'
          />
        </label>
        <label>
          <input
            className='mr-1'
            type='radio'
            name='type'
            value='day'
            checked={type === 'day'}
            onChange={(event) => changeType(event.target.value)}
          />
          {'Dni'}
        </label>
        <label>
          <input
            className='mr-1'
            type='radio'
            name='type'
            value='week'
            checked={type === 'week'}
            onChange={(event) => changeType(event.target.value)}
          />
          {'Tygodni'}
        </label>
        <label>
          <input
            className='mr-1'
            type='radio'
            name='type'
            value='month'
            checked={type === 'month'}
            onChange={(event) => changeType(event.target.value)}
          />
          {'Miesięcy'}
        </label>
        <label>
          <input
            className='mr-1'
            type='radio'
            name='type'
            value='year'
            checked={type === 'year'}
            onChange={(event) => changeType(event.target.value)}
          />
          {'Lat'}
        </label>
      </form>
      <div>
        {start ? (
          amount && type ? (
            <Output date={calculate(start, amount, type)} />
          ) : (
            <InvalidDataMessage message={'Wprowadź długość terminu'} />
          )
        ) : (
          <InvalidDataMessage message={'Wprowadź datę początkową'} />
        )}
      </div>
      <p className='mb-1'>{'Sposób obliczenia terminu:'}</p>
    </div>
  );
}

export default App;
