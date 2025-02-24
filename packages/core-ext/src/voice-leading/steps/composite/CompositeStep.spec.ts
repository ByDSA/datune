import { A5, AA5, Array as SPNArray, B5, C6, CC6, DD5, E5, F5, FF5, G5 } from "@datune/core/spns/chromatic";
import { TestInit } from "tests";
import { SingleStep } from "../single";
import { CompositeStep } from "./CompositeStep";

TestInit.loadAll();
it("cache fromIntervals same", () => {
  const actual = CompositeStep.fromIntervals(0, 1);
  const expected = CompositeStep.fromIntervals(0, 1);

  expect(actual).toBe(expected);
} );

it("cache fromIntervals different", () => {
  const actual = CompositeStep.fromIntervals(0, 1);
  const notExpected = CompositeStep.fromIntervals(0, 2);

  expect(actual).not.toBe(notExpected);
} );

describe.each([
  [CompositeStep.KEEP_U1, F5, C6],
  [CompositeStep.KEEP_U2, F5, CC6],
  [CompositeStep.KEEP_D1, F5, AA5],
  [CompositeStep.KEEP_D2, F5, A5],
  [CompositeStep.KEEP_NULL, F5, null],
  [CompositeStep.U1_KEEP, FF5, B5],
  [CompositeStep.U1_U1, FF5, C6],
  [CompositeStep.U1_U2, FF5, CC6],
  [CompositeStep.U1_D1, FF5, AA5],
  [CompositeStep.U1_D2, FF5, A5],
  [CompositeStep.U1_NULL, FF5, null],
  [CompositeStep.U2_KEEP, G5, B5],
  [CompositeStep.U2_U1, G5, C6],
  [CompositeStep.U2_U2, G5, CC6],
  [CompositeStep.U2_D1, G5, AA5],
  [CompositeStep.U2_D2, G5, A5],
  [CompositeStep.U2_NULL, G5, null],
  [CompositeStep.D1_KEEP, E5, B5],
  [CompositeStep.D1_U1, E5, C6],
  [CompositeStep.D1_U2, E5, CC6],
  [CompositeStep.D1_D1, E5, AA5],
  [CompositeStep.D1_D2, E5, A5],
  [CompositeStep.D1_NULL, E5, null],
  [CompositeStep.D2_KEEP, DD5, B5],
  [CompositeStep.D2_U1, DD5, C6],
  [CompositeStep.D2_U2, DD5, CC6],
  [CompositeStep.D2_D1, DD5, AA5],
  [CompositeStep.D2_D2, DD5, A5],
  [CompositeStep.D2_NULL, DD5, null],
  [CompositeStep.NULL_KEEP, null, B5],
  [CompositeStep.NULL_U1, null, C6],
  [CompositeStep.NULL_U2, null, CC6],
  [CompositeStep.NULL_D1, null, AA5],
  [CompositeStep.NULL_D2, null, A5],
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
