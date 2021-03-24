export enum Step {
  START,
  DAY_START,
  END,
  SHIFT_END,
  SATURDAY,
  SUNDAY,
  NY,
  KINGS,
  MAY1,
  MAY3,
  NMP,
  NOV1,
  INDEPENDENCE,
  CHRISTMASS,
  BOXING,
  PW,
  BC
}

export interface CalculationStep {
  date: Date;
  step: Step;
}
