/* eslint-disable camelcase */
import { IntervalArray, Intervals } from "intervals/alt";
import { Voicings as V } from "..";
import { fromRootIntervals } from "./rootIntervals";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { SEVENTH, THIRTEENTH_b5a9, TRIAD_MAJOR } = V;

it("immutable: 0, 4, 7", () => {
  const { M3, P5, P1 } = Intervals;
  const voicing = fromRootIntervals(P1, M3, P5);

  expect(voicing).toBe(TRIAD_MAJOR);
} );

it("immutable new voicing: 0, 1", () => {
  const { m2, P1 } = Intervals;
  const voicing = fromRootIntervals(P1, m2);
  const voicing2 = fromRootIntervals(P1, m2);

  expect(voicing2).toBe(voicing);
} );

it("p1, M3, d5, m7, a9, P11, M13", () => {
  const { a9, d5, M3, M13, m7, P11, P1 } = Intervals;
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
  const { M3, m7, P5, P1 } = Intervals;
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
