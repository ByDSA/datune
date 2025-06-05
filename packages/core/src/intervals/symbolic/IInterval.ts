export interface IInterval {
  withShifted(interval: IInterval): IInterval;
  withShiftedDown(interval: IInterval): IInterval;
}
