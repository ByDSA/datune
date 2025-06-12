export interface IDegreeFunc<I, D, V> {
  degree: D;
  voicing: V;
  degrees: D[];

  withShifted(interval: I): IDegreeFunc<I, D, V>;
  withShiftedDown(interval: I): IDegreeFunc<I, D, V>;
  withBaseDegree(degree: D): IDegreeFunc<I, D, V>;
  withVoicing(voicing: V): IDegreeFunc<I, D, V>;
}
