import React from 'react';

interface Props {
  date: Date;
}

const week: Array<string> = [
  'niedziela',
  'poniedziałek',
  'wtorek',
  'środa',
  'czwartek',
  'piątek',
  'sobota',
];

const year: Array<string> = [
  'stycznia',
  'lutego',
  'marca',
  'kwietnia',
  'maja',
  'czerwca',
  'lipca',
  'sierpnia',
  'września',
  'października',
  'listopada',
  'grudnia',
];

const Output: React.FC<Props> = ({ date }) => {
  return (
    <div className='flex flex-col place-items-center m-2 px-7 py-2 bg-green-100 rounded-md'>
      <h2 className='text-green-700 text-bold '>Wynik:</h2>
      <p className='text-green-700 text-xl'>
        {date.getDate() +
          ' ' +
          year[date.getMonth()] +
          ' ' +
          date.getFullYear()}
      </p>
      <p className='text-green-700 text-lg'>{week[date.getDay()]}</p>
    </div>
  );
};

export default Output;
