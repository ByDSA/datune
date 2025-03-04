import { TestInit } from "tests";
import { Intervals as I, type Interval } from "..";
import { expectInterval } from "../tests/interval";
import { sub } from "./sub";
import { neg } from "./neg";

TestInit.diatonicAltInterval();

describe("tests", () => {
  describe.each([
    [I.P5, I.P5, I.P1],
    [I.P5, I.M3, I.m3],
    [I.P5, I.m3, I.M3],
    [I.P1, I.m3, neg(I.m3)],
    [I.P1, I.P8, neg(I.P8)],
    [I.P1, I.a8, neg(I.a8)],
    [I.P5, I.a5, neg(I.a1)],
    [I.a5, I.P5, I.a1],
    [I.P1, I.d8, neg(I.d8)],
    [I.P8, I.a8, neg(I.a1)],
  ])("test", (a, b, expected) => {
    it(a.toString() + " - " + b.toString() + " should be " + expected.toString(), () => {
      const actual = sub(a, b);

      expect(actual).not.toBeNull();

      expectInterval(actual as Interval, expected);
    } );
  } );
} );
