import type { MusicalDuration } from "./MusicalDuration";
import { add, div, divCell, mult, sub } from "@datune/utils/time";
import { dotted, triplet } from "./modifiers";
import { MusicalDurations as MD } from ".";

const { EIGHTH, HALF, QUARTER, SIXTEENTH, WHOLE, ZERO } = MD;

it("withAdd - QUARTER + QUARTER = HALF", () => {
  const actual: MusicalDuration = add(QUARTER, QUARTER);
  const expected = HALF;

  expect(actual).toEqual(expected);
} );

it("withAdd - QUARTER + ZERO = QUARTER", () => {
  const actual: MusicalDuration = add(QUARTER, ZERO);
  const expected = QUARTER;

  expect(actual).toEqual(expected);
} );

it("withSub - HALF - QUARTER = QUARTER", () => {
  const actual: MusicalDuration = sub(HALF, QUARTER);
  const expected = QUARTER;

  expect(actual).toEqual(expected);
} );

it("withSub - QUARTER - QUARTER = ZERO", () => {
  const actual: MusicalDuration = sub(QUARTER, QUARTER);
  const expected = ZERO;

  expect(actual).toEqual(expected);
} );

it("withMult - QUARTER * 3 = WHOLE-QUARTER", () => {
  const actual: MusicalDuration = mult(QUARTER, 3);
  const expected = sub(WHOLE, QUARTER);

  expect(actual).toEqual(expected);
} );

it("withDiv - WHOLE / 4 = QUARTER", () => {
  const actual: MusicalDuration = div(WHOLE, 4);
  const expected = QUARTER;

  expect(actual).toEqual(expected);
} );

it("dotted - QUARTER.dotted = QUARTER + EIGHTH", () => {
  const actual: MusicalDuration = dotted(QUARTER);
  const expected = add(QUARTER, EIGHTH);

  expect(actual).toEqual(expected);
} );

it("dotted - QUARTER.dotted.dotted = 2*QUARTER + SIXTEENTH", () => {
  const actual: MusicalDuration = dotted(dotted(QUARTER));
  const expected = add(mult(QUARTER, 2), SIXTEENTH);

  expect(actual).toEqual(expected);
} );

it("dotted - QUARTER.triplet*3 = 2*QUARTER", () => {
  const actual: MusicalDuration = mult(triplet(QUARTER), 3);
  const expected = mult(QUARTER, 2);

  expect(actual).toEqual(expected);
} );

it("withDivCell - WHOLE div QUARTER.dotted = 2", () => {
  const actual: number = divCell(WHOLE, dotted(QUARTER));
  const expected = 2;

  expect(actual).toEqual(expected);
} );

it("withDivCell - WHOLE div ZERO", () => {
  const actual: number = divCell(WHOLE, ZERO);
  const expected = Infinity;

  expect(actual).toEqual(expected);
} );

it("interval - QUARTER < QUARTER.dotted", () => {
  const actual: boolean = QUARTER < dotted(QUARTER);
  const expected = true;

  expect(actual).toEqual(expected);
} );

it("interval - QUARTER.dotted < HALF", () => {
  const actual: boolean = dotted(QUARTER) < HALF;
  const expected = true;

  expect(actual).toEqual(expected);
} );
