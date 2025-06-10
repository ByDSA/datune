import { Degrees as D, Funcs, Intervals as I, type Interval, Voicings as V } from "alt";
import { Degrees as DD } from "diatonic";
import { shift, shiftDown } from ".";

describe.each([
  [Funcs.I, I.P5, Funcs.V],
  [Funcs.II, I.P5, Funcs.VI],
  [Funcs.IVm, I.P5, Funcs.Im],
  [Funcs.VIMaj7, I.P12, Funcs.IIIMaj7],
  [Funcs.IV, I.a4, Funcs.VII],
  [Funcs.IV, I.d5, Funcs.I.withDegree(I.fromDiatonicInterval(DD.I, -1))], // IV + d5 = bI
  [Funcs.V, I.P4, Funcs.I],
  [Funcs.V, I.P4.withNeg(), Funcs.II],
])("shift, shiftDown", (obj, interval: Interval, expected) => {
  describe(`(${obj}) + (${interval})`, () => {
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
} );

it("degree", () => {
  const expected = Funcs.I0;
  const actual = Funcs.VII0.withDegree(D.I);

  expect(actual).toBe(expected);
} );

it("voicing", () => {
  const expected = Funcs.I0;
  const actual = Funcs.I.withVoicing(V.TRIAD_DIMINISHED);

  expect(actual).toBe(expected);
} );
