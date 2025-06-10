export interface IInterval {
  withShifted(interval: IInterval): IInterval;
  withShiftedDown(interval: IInterval): IInterval;
  withNeg(): IInterval;
  withAbs(): IInterval;
  withSimplified(): IInterval;
  withCyclicOctave(): IInterval;
}
