import React from 'react'
import { CalculationStep, Step } from '../helpers/CalculationStep'
import { Year } from '../helpers/calendar'

interface Props {
  steps: CalculationStep[]
}

function label(step: Step): string {
  switch (step) {
    case Step.BC:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Boże Ciało"
    case Step.BOXING:
      return "Przesunięcie - dzień ustawowo wolny od pracy - św. Szczepana"
    case Step.CHRISTMASS:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Boże Narodzenie"
    case Step.DAY_START:
      return "Dzień, od którego biegnie termin"
    case Step.END:
      return "Ostatni dzień terminu"
    case Step.INDEPENDENCE:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Święto Niepodlegołości"
    case Step.KINGS:
      return "Przesunięcie - dzień ustawowo wolny od pracy - 3 Króli"
    case Step.MAY1:
      return "Przesunięcie - dzień ustawowo wolny od pracy - 1 Maja"
    case Step.MAY3:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Święto 3 Maja"
    case Step.NMP:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Najświętszej Marii Panny"
    case Step.NOV1:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Wszystkich Świętych"
    case Step.NY:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Nowy Rok"
    case Step.PW:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Poniedziałek Wielkanocny"
    case Step.SATURDAY:
      return "Przesunięcie - Sobota"
    case Step.SHIFT_END:
      return "Ostatni dzień terminu po przesunięciach"
    case Step.START:
      return "Początek terminu"
    case Step.SUNDAY:
      return "Przesunięcie - dzień ustawowo wolny od pracy - Niedziela"
    default:
      return "Something went wrong"
  }
}

const CalculationVisualisation:React.FC<Props> = ({steps}) => {
  return (
    <div>
      {
        steps.map((value, inx) => {
          return (<div className='flex justify-between'>
            <p className='mr-2 text-gray-700'> {value.date.getDate() + ' ' + Year[value.date.getMonth()] + ' ' + value.date.getFullYear()}</p>
            <p>{label(value.step)}</p>
          </div>)
        })
      }
    </div>
  )
}

export default CalculationVisualisation
