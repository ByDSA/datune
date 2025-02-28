import type { SPNArray } from "@datune/core/spns/chromatic";
import { SPNs } from "@datune/core/spns/chromatic";
import { SingleStep } from "../single";
import { CompositeSteps } from "./CompositeSteps";
import { TestInit } from "tests";

TestInit.loadAll();

it("cache fromIntervals same", () => {
  const actual = CompositeSteps.fromIntervals(0, 1);
  const expected = CompositeSteps.fromIntervals(0, 1);

  expect(actual).toBe(expected);
} );

it("cache fromIntervals different", () => {
  const actual = CompositeSteps.fromIntervals(0, 1);
  const notExpected = CompositeSteps.fromIntervals(0, 2);

  expect(actual).not.toBe(notExpected);
} );

describe("tests", () => {
  const { A5, AA5, B5, C6, CC6, DD5, E5, F5, FF5, G5 } = SPNs;

  describe.each([
    [CompositeSteps.KEEP_U1, F5, C6],
    [CompositeSteps.KEEP_U2, F5, CC6],
    [CompositeSteps.KEEP_D1, F5, AA5],
    [CompositeSteps.KEEP_D2, F5, A5],
    [CompositeSteps.KEEP_NULL, F5, null],
    [CompositeSteps.U1_KEEP, FF5, B5],
    [CompositeSteps.U1_U1, FF5, C6],
    [CompositeSteps.U1_U2, FF5, CC6],
    [CompositeSteps.U1_D1, FF5, AA5],
    [CompositeSteps.U1_D2, FF5, A5],
    [CompositeSteps.U1_NULL, FF5, null],
    [CompositeSteps.U2_KEEP, G5, B5],
    [CompositeSteps.U2_U1, G5, C6],
    [CompositeSteps.U2_U2, G5, CC6],
    [CompositeSteps.U2_D1, G5, AA5],
    [CompositeSteps.U2_D2, G5, A5],
    [CompositeSteps.U2_NULL, G5, null],
    [CompositeSteps.D1_KEEP, E5, B5],
    [CompositeSteps.D1_U1, E5, C6],
    [CompositeSteps.D1_U2, E5, CC6],
    [CompositeSteps.D1_D1, E5, AA5],
    [CompositeSteps.D1_D2, E5, A5],
    [CompositeSteps.D1_NULL, E5, null],
    [CompositeSteps.D2_KEEP, DD5, B5],
    [CompositeSteps.D2_U1, DD5, C6],
    [CompositeSteps.D2_U2, DD5, CC6],
    [CompositeSteps.D2_D1, DD5, AA5],
    [CompositeSteps.D2_D2, DD5, A5],
    [CompositeSteps.D2_NULL, DD5, null],
    [CompositeSteps.NULL_KEEP, null, B5],
    [CompositeSteps.NULL_U1, null, C6],
    [CompositeSteps.NULL_U2, null, CC6],
    [CompositeSteps.NULL_D1, null, AA5],
    [CompositeSteps.NULL_D2, null, A5],
  ])("intervals work fine", (motion, expectedBottom, expectedTop) => {
    const name = motion.singleSteps.map(
      (sm: SingleStep, i: number) => (i > 0 ? ", " : "") + sm.toString(),
    ).toString();

    it(`${name}: ${expectedBottom} ${expectedTop}`, () => {
      const source: SPNArray = [F5, B5];
      const actual = motion.apply(source);
      const expected = [
        expectedBottom,
        expectedTop,
      ];

      expect(actual).toStrictEqual(expected);
    } );
  } );
} );
