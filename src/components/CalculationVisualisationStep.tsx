import React, { useState } from 'react';
import { CalculationStep, Step } from '../helpers/CalculationStep';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import { Year } from '../helpers/calendar';

function label(step: Step): string {
  switch (step) {
    case Step.BC:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Boże Ciało';
    case Step.BOXING:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - św. Szczepana';
    case Step.CHRISTMASS:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Boże Narodzenie';
    case Step.DAY_START:
      return 'Dzień, od którego biegnie termin';
    case Step.END:
      return 'Ostatni dzień terminu';
    case Step.INDEPENDENCE:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Święto Niepodlegołości';
    case Step.KINGS:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - 3 Króli';
    case Step.MAY1:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - 1 Maja';
    case Step.MAY3:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Święto 3 Maja';
    case Step.NMP:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Najświętszej Marii Panny';
    case Step.NOV1:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Wszystkich Świętych';
    case Step.NY:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Nowy Rok';
    case Step.PW:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Poniedziałek Wielkanocny';
    case Step.SATURDAY:
      return 'Przesunięcie - Sobota';
    case Step.SHIFT_END:
      return 'Ostatni dzień terminu po przesunięciach';
    case Step.START:
      return 'Początek terminu';
    case Step.SUNDAY:
      return 'Przesunięcie - dzień ustawowo wolny od pracy - Niedziela';
    default:
      return 'Something went wrong';
  }
}

function why(step: Step): string {
  switch (step) {
    case Step.DAY_START:
      return 'art. 123 § 1 k.p.k. Do biegu terminu nie wlicza się dnia, od którego liczy się dany termin.';

    default:
      return 'art. 123 § 3. Jeżeli koniec terminu przypada na dzień uznany przez ustawę za dzień wolny od pracy lub na sobotę, czynność można wykonać następnego dnia, który nie jest dniem wolnym od pracy ani sobotą.';
  }
}

interface IProps {
  step: CalculationStep;
}

const CalculationVisualisationStep: React.FC<IProps> = ({ step }) => {
  const [expand, changeExpand] = useState(false);

  return (
    <div className='flex flex-col my-2 p-2 bg-gray-100 rounded-md'>
      <div className='flex justify-between items-center '>
        <p className='mr-2 text-gray-600 font-semibold'>
          {step.date.getDate() +
            ' ' +
            Year[step.date.getMonth()] +
            ' ' +
            step.date.getFullYear()}
        </p>
        <p className='flex-1 text-right text-sm'>{label(step.step)}</p>
        <div className='pl-1' onClick={() => changeExpand(!expand)}>
          {expand ? <MdExpandLess /> : <MdExpandMore />}
        </div>
      </div>
      <p className={!expand ? 'hidden' : ''}>{why(step.step)}</p>
    </div>
  );
};

export default CalculationVisualisationStep;
