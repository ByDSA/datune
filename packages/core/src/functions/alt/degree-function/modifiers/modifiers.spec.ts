import { Degrees as D, Funcs, Intervals as I, type Interval, Voicings as V } from "alt";
import { shift, shiftDown } from ".";

describe.each([
  [Funcs.I, I.P5, Funcs.V],
  [Funcs.II, I.P5, Funcs.VI],
  [Funcs.IVm, I.P5, Funcs.Im],
  [Funcs.VIMaj7, I.P12, Funcs.IIIMaj7],
  [Funcs.IV, I.a4, Funcs.VII],
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

describe.each([
  [Funcs.IV, I.d5, Funcs.VII], // IV + d5 = bI (VII)
])("shift enharmonic fixed: base %s, interval %s", (base, interval, expected) => {
  it("should not throw error", () => {
    expect(() => {
      shift(base, interval);
    } ).not.toThrow();
  } );

  it("should return expected value", () => {
    const actual = shift(base, interval);

    expect(actual).toBe(expected);
  } );

  describe("reversible", () => {
    let notBase: typeof base;

    beforeAll(() => {
      notBase = shiftDown(expected, interval);
    } );

    it("should not be reversible", () => {
      expect(notBase).not.toBe(base);
    } );

    it("should have the same chromatic value as base", () => {
      expect(notBase.toChromatic()).toBe(base.toChromatic());
    } );
  } );
} );

it("degree", () => {
  const expected = Funcs.I0;
  const actual = Funcs.VII0.withBaseDegree(D.I);

  expect(actual).toBe(expected);
} );

it("voicing", () => {
  const expected = Funcs.I0;
  const actual = Funcs.I.withVoicing(V.TRIAD_DIMINISHED);

  expect(actual).toBe(expected);
} );
