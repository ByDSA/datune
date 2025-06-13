export interface IInterval<D> {
  withShifted(interval: IInterval<D>): IInterval<D>;
  withShiftedDown(interval: IInterval<D>): IInterval<D>;
  withNeg(): IInterval<D>;
  withAbs(): IInterval<D>;
  withSimplified(): IInterval<D>;
  withCyclicOctave(): IInterval<D>;
  toDegree(): D;
}
