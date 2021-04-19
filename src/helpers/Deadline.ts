import { ICalculationStep, Step } from './ICalculationStep';
import IParameters from './IParameters';

export default class Deadline {
  private start: Date;
  private calculationSteps: Array<ICalculationStep> = [];

  constructor(start: Date) {
    this.start = start;
    this.calculationSteps.push({
      date: new Date(this.start),
      step: Step.START,
    });
  }

  //calculate and return end date
  calculate(amount: number, parameters: IParameters): Date {
    let startDate = new Date(this.start);
    let endDate: Date;
    this.calculationSteps = this.calculationSteps.slice(0, 1);
    let backupDate: Date;
    let delta: number;

    //calculate endDate given term type
    switch (parameters.type) {
      case 'day':
        this.calculationSteps.push({
          date: new Date(
            new Date(this.start).setDate(this.start.getDate() + 1)
          ),
          step: Step.DAY_START,
        });
        endDate = new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * amount);
        break;
      case 'week':
        endDate = new Date(startDate.setDate(startDate.getDate() + amount * 7));
        break;
      case 'month':
        //start date
        backupDate = new Date(startDate);
        endDate = new Date(startDate.setMonth(startDate.getMonth() + amount));
        //last day of month
        delta = endDate.getDate() - backupDate.getDate();
        while (delta < -3) {
          endDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 24);
          delta = endDate.getDate() - backupDate.getDate();
        }
        break;
      case 'year':
        //start date
        backupDate = new Date(startDate);
        endDate = new Date(
          startDate.setFullYear(startDate.getFullYear() + amount)
        );
        //last day of month
        delta = endDate.getDate() - backupDate.getDate();
        while (delta < -1) {
          endDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 24);
          delta = endDate.getDate() - backupDate.getDate();
        }
        break;
      //radio must be unchecked - imposible?
      default:
        return startDate;
    }
    //add last day of term
    this.calculationSteps.push({
      date: endDate,
      step: Step.END,
    });

    //check if holiday shifts are needed
    let isHoliday: boolean | Step = this.isHoliday(endDate);

    if (isHoliday) {
      //shift to next day if last day is non-labour day
      while (typeof isHoliday !== 'boolean') {
        this.calculationSteps.push({
          date: new Date(endDate),
          step: isHoliday,
        });

        //shift back if dontShift is enabled else shift forward
        if (parameters.dontShift)
          endDate = new Date(endDate.getTime() - 1000 * 60 * 60 * 24);
        else endDate = new Date(endDate.getTime() + 1000 * 60 * 60 * 24);

        //check next day
        isHoliday = this.isHoliday(endDate);
      }

      //add day after shifts
      this.calculationSteps.push({
        date: endDate,
        step: Step.SHIFT_END,
      });
    }
    return endDate;
  }

  //generate wielkanoc day for desired year - Gaussian method
  private wielkanoc(year: number): Date {
    let a = 24;
    let b = 5;
    const ra = year % 19;
    const rb = year % 4;
    const rc = year % 7;
    const rd = (ra * 19 + a) % 30;
    const re = (2 * rb + 4 * rc + 6 * rd + b) % 7;
    if (rd + re < 10) return new Date(year, 2, rd + re + 22);
    else return new Date(year, 3, rd + re - 9);
  }

  //check if chosen day is holiday
  private isHoliday(date: Date): boolean | Step {
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const month = date.getMonth();
    //saturday, sunday -> zeslanie Ducha Swietego check redundant
    if (dayOfWeek === 0) {
      return Step.SUNDAY;
    }
    if (dayOfWeek === 6) {
      return Step.SATURDAY;
    }
    switch (month) {
      case 0: //styczen
        //nowy rok, trzech kroli
        if (day === 1) {
          return Step.NY;
        }
        if (day === 6) {
          return Step.KINGS;
        }
        break;
      case 4: //maj
        //majowka
        if (day === 1) {
          return Step.MAY1;
        }
        if (day === 3) {
          return Step.MAY3;
        }
        break;
      case 7: //sierpien
        //wnieboziecie NMP
        if (day === 15) {
          return Step.NMP;
        }
        break;
      case 10: //listopad
        //wszystkich swietych, swieto niepodleglosci
        if (day === 1) {
          return Step.NOV1;
        }
        if (day === 11) {
          return Step.INDEPENDENCE;
        }
        break;
      case 11: //grudzien
        //Boze narodzenie, sw. Szczepana
        if (day === 25) {
          return Step.CHRISTMASS;
        }
        if (day === 26) {
          return Step.BOXING;
        }
        break;
    }
    //caculate wielkanoc for desirable year;
    const wielkanocDay = this.wielkanoc(date.getFullYear());
    const poniedzialekWielkanocny = new Date(
      wielkanocDay.getTime() + 1000 * 60 * 60 * 24
    );
    const bozeCialo = new Date(
      wielkanocDay.getTime() + 1000 * 60 * 60 * 24 * 60
    );

    //wielkanoc is sunday -> check redundant , poniedzialek wielkanocny, Boze Cialo
    if (
      day === poniedzialekWielkanocny.getDate() &&
      month === poniedzialekWielkanocny.getMonth()
    ) {
      return Step.PW;
    }
    if (day === bozeCialo.getDate() && month === bozeCialo.getMonth()) {
      return Step.BC;
    }
    return false;
  }

  getSteps() {
    return this.calculationSteps;
  }
}
