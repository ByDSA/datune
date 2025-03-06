import { from } from "./building/from";
import { MusicalDurations as MD } from ".";

const { DOUBLE, EIGHTH, HALF, LONGA, MAXIMA,
  QUARTER, SIXTEENTH, SIXTYFOURTH, THIRTYSECOND, WHOLE, ZERO } = MD;

it("precalc - QUARTER", () => {
  const value = +QUARTER;
  const expected = 0.25;

  expect(value).toBe(expected);
} );

it("precalc - HALF", () => {
  const value = +HALF;
  const expected = 0.5;

  expect(value).toBe(expected);
} );

it("precalc - WHOLE", () => {
  const value = +WHOLE;
  const expected = 1;

  expect(value).toBe(expected);
} );

it("precalc - ZERO", () => {
  const value = +ZERO;
  const expected = 0;

  expect(value).toBe(expected);
} );

it("cached values", () => {
  expect(MAXIMA).toBe(from(8));
  expect(LONGA).toBe(from(4));
  expect(DOUBLE).toBe(from(2));
  expect(WHOLE).toBe(from(1));
  expect(HALF).toBe(from(0.5));
  expect(QUARTER).toBe(from(0.25));
  expect(EIGHTH).toBe(from(0.125));
  expect(SIXTEENTH).toBe(from(0.0625));
  expect(THIRTYSECOND).toBe(from(0.03125));
  expect(SIXTYFOURTH).toBe(from(0.03125 / 2));
  expect(ZERO).toBe(from(0));
} );
