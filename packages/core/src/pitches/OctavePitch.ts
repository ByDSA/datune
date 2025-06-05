export interface OctavePitch<I> {
  withShifted(interval: I): OctavePitch<I>;
  withShiftedDown(interval: I): OctavePitch<I>;
}
