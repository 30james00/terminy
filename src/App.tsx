import React, { useState } from 'react';

import Term from './helpers/Term';
import Output from './components/Output';
import InvalidDataMessage from './components/InvalidDataMessage';
import CalculationVisualisation from './components/CalculationVisualisation';
import IParameters from './helpers/IParameters';
import StateButton from './components/StateButton';

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
    <div className='col mt-3 p-2'>
      <h1 className='mb-4 text-4xl font-black'>Terminy</h1>
      <div className='col'>
        <p className='sh'>{'Wybierz datę poczatkową:'}</p>
        <div className='mb-2'>
          <form>
            <input
              className='px-2 py-1 border-2 border-blue-900 rounded-md'
              onChange={handleDateChange}
              type='date'
              name='date'
              id='date'
            />
          </form>
        </div>
      </div>
      <div className='col'>
        <p className='sh'>{'Ustaw parametry terminu:'}</p>
        <div className='flex flex-row my-2 rounded-md border-2 border-blue-900'>
          <StateButton
            desirableState='day'
            state={parameters.type}
            label='Dni'
            changeState={() => handleTypeChange('day')}
          />
          <StateButton
            desirableState='week'
            state={parameters.type}
            label='Tygodni'
            changeState={() => handleTypeChange('week')}
          />
          <StateButton
            desirableState='month'
            state={parameters.type}
            label='Miesięcy'
            changeState={() => handleTypeChange('month')}
          />
          <StateButton
            desirableState='year'
            state={parameters.type}
            label='Lat'
            changeState={() => handleTypeChange('year')}
          />
        </div>
        <label>
          {'Ilość:'}
          <input
            className='ml-2 p-1 w-12 rounded-md border-2 border-blue-900'
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
      </div>
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
          <div className='col max-w-prose'>
            <p className='sh'>{'Sposób obliczenia terminu:'}</p>
            <CalculationVisualisation
              steps={start.getSteps()}
              type={parameters.type}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
