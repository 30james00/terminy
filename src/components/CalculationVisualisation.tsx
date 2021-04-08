import React from 'react';
import { CalculationStep } from '../helpers/CalculationStep';
import CalculationVisualisationStep from './CalculationVisualisationStep';

interface IProps {
  steps: CalculationStep[];
}

const CalculationVisualisation: React.FC<IProps> = ({ steps }) => {
  return (
    <div>
      {steps.map((value, inx) => {
        return <CalculationVisualisationStep key={inx} step={value} />;
      })}
    </div>
  );
};

export default CalculationVisualisation;
