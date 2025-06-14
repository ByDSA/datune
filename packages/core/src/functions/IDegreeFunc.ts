import type { NonEmptyArray } from "datils/datatypes/arrays";

export interface IDegreeFunc<I, D, IS> {
  baseDegree: D;
  intervalSet: IS;
  degrees: Readonly<NonEmptyArray<D>>;

  withShifted(interval: I): IDegreeFunc<I, D, IS>;
  withShiftedDown(interval: I): IDegreeFunc<I, D, IS>;
  withBaseDegree(degree: D): IDegreeFunc<I, D, IS>;
  withIntervalSet(intervalSet: IS): IDegreeFunc<I, D, IS>;
}
