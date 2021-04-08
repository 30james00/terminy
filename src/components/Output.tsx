import React from 'react';
import { Week, Year } from '../helpers/calendar';

interface IProps {
  date: Date;
}

const Output: React.FC<IProps> = ({ date }) => {
  return (
    <div className='flex flex-col place-items-center m-3 px-7 py-2 bg-green-100 rounded-md'>
      <h2 className='text-green-700 text-lg font-bold' >Wynik:</h2>
      <p className='text-green-700 text-xl'>
        {date.getDate() +
          ' ' +
          Year[date.getMonth()] +
          ' ' +
          date.getFullYear()}
      </p>
      <p className='text-green-700'>{Week[date.getDay()]}</p>
    </div>
  );
};

export default Output;
