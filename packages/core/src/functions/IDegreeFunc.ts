import type { NonEmptyArray } from "datils/datatypes/arrays";

export interface IDegreeFunc<I, D, V> {
  baseDegree: D;
  voicing: V;
  degrees: Readonly<NonEmptyArray<D>>;

  withShifted(interval: I): IDegreeFunc<I, D, V>;
  withShiftedDown(interval: I): IDegreeFunc<I, D, V>;
  withBaseDegree(degree: D): IDegreeFunc<I, D, V>;
  withVoicing(voicing: V): IDegreeFunc<I, D, V>;
}
