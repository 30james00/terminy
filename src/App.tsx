import React, { useState } from 'react';

import Term from './helpers/Term';
import Output from './components/Output';
import InvalidDataMessage from './components/InvalidDataMessage';
import CalculationVisualisation from './components/CalculationVisualisation';

function App() {
  const [start, changeStart] = useState<Term | null>(null);
  const [type, changeType] = useState('day');
  const [amount, changeAmount] = useState(14);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.valueAsDate;
    if (val) changeStart(new Term(val));
  };

  return (
    <div className='container flex flex-col place-content-center place-items-center mt-3 p-2'>
      <h1 className='mb-4 text-4xl font-black'>Terminy</h1>
      <p className='mb-1'>{'Wybierz datę poczatkową:'}</p>
      <div className='mb-2'>
        <form>
          <input
            className='px-2 py-1 border-2 rounded'
            onChange={handleDateChange}
            type='date'
            name='date'
            id='date'
          />
        </form>
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
            max='99'
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
          amount > 0 && amount < 100 && type ? (
            <Output date={start.calculate(amount, type)} />
          ) : (
            <InvalidDataMessage message={'Wprowadź odpowiednią długość i typ terminu'} />
          )
        ) : (
          <InvalidDataMessage message={'Wprowadź datę początkową'} />
        )}
      </div>
      <div>
        {(start && amount > 0 && amount < 100 && type) && (
          <div className='flex flex-col place-content-center place-items-center'>
            <p className='mb-1'>{'Sposób obliczenia terminu:'}</p>
            <CalculationVisualisation steps={start.getSteps()} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
