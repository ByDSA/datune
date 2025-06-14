/* eslint-disable camelcase */
import { IntervalArray, Intervals as I } from "intervals/alt";
import { IntervalSets as IS } from "..";
import { fromRootIntervals } from "./rootIntervals";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SEVENTH, THIRTEENTH_b5a9, TRIAD_MAJOR } = IS;

it("immutable: 0, 4, 7", () => {
  const { M3, P5, P1 } = I;
  const intervalSet = fromRootIntervals(P1, M3, P5);

  expect(intervalSet).toBe(TRIAD_MAJOR);
} );

it("immutable new intervalSet: 0, 1", () => {
  const { m2, P1 } = I;
  const intervalSet = fromRootIntervals(P1, m2);
  const intervalSet2 = fromRootIntervals(P1, m2);

  expect(intervalSet2).toBe(intervalSet);
} );

it("p1, M3, d5, m7, a9, P11, M13", () => {
  const { a9, d5, M3, M13, m7, P11, P1 } = I;
  const actual = fromRootIntervals(
    P1,
    M3,
    d5,
    m7,
    a9,
    P11,
    M13,
  );
  const expected = THIRTEENTH_b5a9;

  expect(actual).toBe(expected);
} );

it("p1-M3-P5-m7 = SEVENTH", () => {
  const { M3, m7, P5, P1 } = I;
  const rootIntervals: IntervalArray = [
    P1,
    M3,
    P5,
    m7,
  ];
  const actual = fromRootIntervals(...rootIntervals);
  const expected = SEVENTH;

  expect(actual).toBe(expected);
} );

it("order should not have effect", () => {
  const intervalSet1 = fromRootIntervals(I.P1, I.P5);
  const intervalSet2 = fromRootIntervals(I.P5, I.P1);

  expect(intervalSet1).toBe(intervalSet2);
} );
