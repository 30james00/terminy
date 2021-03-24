import { CalculationStep, Step } from './CalculationStep';

export default class Term {
  private start: Date;
  private calculationSteps: Array<CalculationStep> = [];

  constructor(start: Date) {
    this.start = start;
    this.calculationSteps.push({
      date: new Date(this.start),
      step: Step.START,
    });
  }

  //calculate and return end date
  calculate(amount: number, type: string): Date {
    console.log('eee');
    let startDate = new Date(this.start);
    let endDate: Date;
    this.calculationSteps = this.calculationSteps.slice(0, 1);
    //calculate endDate given term type
    switch (type) {
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
        endDate = new Date(startDate.setMonth(startDate.getMonth() + amount));
        break;
      case 'year':
        endDate = new Date(
          startDate.setFullYear(startDate.getFullYear() + amount)
        );
        break;
      //radio must be unchecked - imposible?
      default:
        return startDate;
    }
    this.calculationSteps.push({
      date: endDate,
      step: Step.END,
    });
    //move to next day if last day is non-labour day
    while (this.isHoliday(endDate)) {
      endDate = new Date(endDate.getTime() + 1000 * 60 * 60 * 24);
    }
    this.calculationSteps.push({
      date: endDate,
      step: Step.SHIFT_END,
    });
    return endDate;
  }

  //generate wielkanoc day for desired year
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
  private isHoliday(date: Date): boolean {
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const month = date.getMonth();
    //saturday, sunday -> zeslanie Ducha Swietego check redundant
    if (dayOfWeek === 0) {
      this.calculationSteps.push({ date: new Date(date), step: Step.SUNDAY });
      return true;
    }
    if (dayOfWeek === 6) {
      this.calculationSteps.push({ date: new Date(date), step: Step.SATURDAY });
      return true;
    }
    switch (month) {
      case 0: //styczen
        //nowy rok, trzech kroli
        if (day === 1) {
          this.calculationSteps.push({ date: new Date(date), step: Step.NY });
          return true;
        }
        if (day === 6) {
          this.calculationSteps.push({
            date: new Date(date),
            step: Step.KINGS,
          });
          return true;
        }
        break;
      case 4: //maj
        //majowka
        if (day === 1) {
          this.calculationSteps.push({ date: new Date(date), step: Step.MAY1 });
          return true;
        }
        if (day === 3) {
          this.calculationSteps.push({ date: new Date(date), step: Step.MAY3 });
          return true;
        }
        break;
      case 7: //sierpien
        //wnieboziecie NMP
        if (day === 15) {
          this.calculationSteps.push({ date: new Date(date), step: Step.NMP });
          return true;
        }
        break;
      case 10: //listopad
        //wszystkich swietych, swieto niepodleglosci
        if (day === 1) {
          this.calculationSteps.push({ date: new Date(date), step: Step.NOV1 });
          return true;
        }
        if (day === 11) {
          this.calculationSteps.push({
            date: new Date(date),
            step: Step.INDEPENDENCE,
          });
          return true;
        }
        break;
      case 11: //grudzien
        //Boze narodzenie, sw. Szczepana
        if (day === 25) {
          this.calculationSteps.push({
            date: new Date(date),
            step: Step.CHRISTMASS,
          });
          return true;
        }
        if (day === 26) {
          this.calculationSteps.push({
            date: new Date(date),
            step: Step.BOXING,
          });
          return true;
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
      this.calculationSteps.push({ date: new Date(date), step: Step.PW });
      return true;
    }
    if (day === bozeCialo.getDate() && month === bozeCialo.getMonth()) {
      this.calculationSteps.push({ date: new Date(date), step: Step.BC });
      return true;
    }

    return false;
  }

  getSteps() {
    console.log(this.calculationSteps);
    return this.calculationSteps;
  }
}
