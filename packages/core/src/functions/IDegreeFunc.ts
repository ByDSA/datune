export interface IDegreeFunc<I, D, V> {
  withShifted(interval: I): IDegreeFunc<I, D, V>;
  withShiftedDown(interval: I): IDegreeFunc<I, D, V>;
  withDegree(degree: D): IDegreeFunc<I, D, V>;
  withVoicing(voicing: V): IDegreeFunc<I, D, V>;
}
