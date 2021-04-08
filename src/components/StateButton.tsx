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
        (state === desirableState ? '' : 'bg-blue-900') + ' px-4 py-1'
      }
      onClick={changeState}
    >
      <p
        className={(state === desirableState ? 'text-blue-900' : 'text-white') + ' font-bold'}
      >
        {label}
      </p>
    </div>
  );
};

export default StateButton;
