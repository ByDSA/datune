export interface IDegree<I> {
  withShifted(interval: I): IDegree<I>;
  withShiftedDown(interval: I): IDegree<I>;
}
