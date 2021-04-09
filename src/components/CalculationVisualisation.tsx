import React from 'react';
import { ICalculationStep } from '../helpers/ICalculationStep';
import CalculationVisualisationStep from './CalculationVisualisationStep';

interface IProps {
  steps: ICalculationStep[];
  type: string;
}

const CalculationVisualisation: React.FC<IProps> = ({ steps, type }) => {
  return (
    <div>
      {steps.map((value, inx) => {
        return <CalculationVisualisationStep key={inx} step={value} type={type}/>;
      })}
    </div>
  );
};

export default CalculationVisualisation;
