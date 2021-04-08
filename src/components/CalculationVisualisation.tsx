import React from 'react';
import { CalculationStep } from '../helpers/CalculationStep';
import CalculationVisualisationStep from './CalculationVisualisationStep';

interface IProps {
  steps: CalculationStep[];
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
