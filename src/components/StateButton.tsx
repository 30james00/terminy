import React from 'react';

interface IProps {
  state: string;
  desirableState: string;
  label: string;
  changeState: () => void;
}

const StateButton: React.FC<IProps> = ({
  state,
  desirableState,
  label,
  changeState,
}) => {
  return (
    <div
      className={
        (state === desirableState ? 'bg-blue-900' : '') + ' px-4 py-1'
      }
      onClick={changeState}
    >
      <p
        className={(state === desirableState ? 'text-white' : 'text-blue-900') + ' font-bold'}
      >
        {label}
      </p>
    </div>
  );
};

export default StateButton;
