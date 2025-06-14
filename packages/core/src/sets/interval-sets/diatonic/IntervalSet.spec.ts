import { Intervals as I } from "diatonic";
import { fromRootIntervalsMagnitude, fromRootIntervals } from "./building";

it("direction should not to have any effect", () => {
  const base = fromRootIntervalsMagnitude(1, -2, 3);
  const actual = fromRootIntervals(
    I.SECOND.withNeg(),
    I.THIRD,
    I.FOURTH.withNeg(),
  );

  expect(actual).toBe(base);
} );

it("should to be independent of order", () => {
  const expected = fromRootIntervals(
    I.SECOND,
    I.THIRD,
    I.FOURTH,
  );
  const actual = fromRootIntervals(
    I.FOURTH,
    I.SECOND,
    I.THIRD,
  );

  expect(actual).toBe(expected);
} );

it("rootIntervals should be sorted", () => {
  const expected = [
    I.UNISON,
    I.THIRD,
    I.FIFTH,
  ];
  const actual = fromRootIntervals(
    I.FIFTH,
    I.UNISON,
    I.THIRD,
  ).rootIntervals;

  expect(actual).toStrictEqual(expected);
} );

it("deltaIntervals should be sorted (by rootInterval)", () => {
  const expected = [
    I.SECOND,
    I.FOURTH,
  ];
  const actual = fromRootIntervals(
    I.FIFTH,
    I.UNISON,
    I.SECOND,
  ).deltaIntervals;

  expect(actual).toStrictEqual(expected);
} );
