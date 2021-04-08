import React, { useState } from 'react';

import Term from './helpers/Term';
import Output from './components/Output';
import InvalidDataMessage from './components/InvalidDataMessage';
import CalculationVisualisation from './components/CalculationVisualisation';
import IParameters from './helpers/IParameters';

function App() {
  const [start, changeStart] = useState<Term | null>(null);
  const [parameters, changeParameters] = useState<IParameters>({
    amount: 1,
    type: 'day',
    dontShift: false,
  });

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.valueAsDate;
    if (val) changeStart(new Term(val));
  };

  const handleTypeChange = (type: string) => {
    changeParameters({
      amount: parameters.amount,
      type: type,
      dontShift: parameters.dontShift,
    });
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
            value={parameters.amount}
            onChange={(event) =>
              changeParameters({
                amount: parseInt(event.target.value),
                type: parameters.type,
                dontShift: parameters.dontShift,
              })
            }
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
            checked={parameters.type === 'day'}
            onChange={(event) => handleTypeChange(event.target.value)}
          />
          {'Dni'}
        </label>
        <label>
          <input
            className='mr-1'
            type='radio'
            name='type'
            value='week'
            checked={parameters.type === 'week'}
            onChange={(event) => handleTypeChange(event.target.value)}
          />
          {'Tygodni'}
        </label>
        <label>
          <input
            className='mr-1'
            type='radio'
            name='type'
            value='month'
            checked={parameters.type === 'month'}
            onChange={(event) => handleTypeChange(event.target.value)}
          />
          {'Miesięcy'}
        </label>
        <label>
          <input
            className='mr-1'
            type='radio'
            name='type'
            value='year'
            checked={parameters.type === 'year'}
            onChange={(event) => handleTypeChange(event.target.value)}
          />
          {'Lat'}
        </label>
      </form>
      <form>
        <label className='flex-shrink'>
          <input
            className='mr-1'
            type='checkbox'
            name='dontShift'
            value='dontShift'
            checked={parameters.dontShift}
            onChange={(event) => 
              changeParameters({
                amount: parameters.amount,
                type: parameters.type,
                dontShift: event.target.checked,
              })
            }
          />
          {'Wyjątek od art. 123 par. 3'}
        </label>
      </form>
      <div>
        {start ? (
          parameters.amount > 0 && parameters.amount < 100 ? (
            <Output date={start.calculate(parameters.amount, parameters)} />
          ) : (
            <InvalidDataMessage
              message={'Wprowadź odpowiednią długość i typ terminu'}
            />
          )
        ) : (
          <InvalidDataMessage message={'Wprowadź datę początkową'} />
        )}
      </div>
      <div>
        {start && parameters.amount > 0 && parameters.amount < 100 && (
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
