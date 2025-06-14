import { Degrees as D, Funcs, Intervals as I, IntervalSets as IS } from "chromatic";
import { shift, shiftDown } from ".";

describe.each([
  [Funcs.I, I.P5, Funcs.V],
  [Funcs.II, I.P5, Funcs.VI],
  [Funcs.IVm, I.P5, Funcs.Im],
  [Funcs.IV, I.d5, Funcs.VII],
  [Funcs.V, I.P4, Funcs.I],
  [Funcs.V, -I.P4, Funcs.II],
])("shift, shiftDown", (obj, interval, expected) => {
  it(`(${obj}) + (${interval}) should be (${expected})`, () => {
    const actual = shift(obj, interval);

    expect(actual).toBe(expected);
  } );

  it(`(${obj}).withShifted(${interval}) should be (${expected})`, () => {
    const actual = obj.withShifted(interval);

    expect(actual).toBe(expected);
  } );

  it(`(${expected}) - (${interval}) should be (${obj})`, () => {
    const actual = shiftDown(expected, interval);

    expect(actual).toBe(obj);
  } );

  it(`(${expected}).withShiftedDown(${interval}) should be (${obj})`, () => {
    const actual = expected.withShiftedDown(interval);

    expect(actual).toBe(obj);
  } );
} );

it("baseDegree", () => {
  const expected = Funcs.I0;
  const actual = Funcs.VII0.withBaseDegree(D.I);

  expect(actual).toBe(expected);
} );

it("intervalSet", () => {
  const expected = Funcs.I0;
  const actual = Funcs.I.withIntervalSet(IS.TRIAD_DIMINISHED);

  expect(actual).toBe(expected);
} );
