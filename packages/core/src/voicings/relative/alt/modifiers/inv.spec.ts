import type { Voicing } from "../Voicing";
import { Intervals as I } from "alt";
import { Voicings as V } from "..";
import { inv } from "./inv";

const { TRIAD_MAJOR } = V;

describe.each([
  [TRIAD_MAJOR, 0, TRIAD_MAJOR],
  [TRIAD_MAJOR, 1, inv(TRIAD_MAJOR)],
  [TRIAD_MAJOR, -1, inv(TRIAD_MAJOR, 2)],
])("tests", (base: Voicing, invNumber: number, expected: Voicing) => {
  const baseName = String(base ?? "undefined");
  const expectedName = String(base ?? "undefined");

  it(`${baseName} invNumber=${invNumber} => ${expectedName}`, () => {
    const actual = inv(base, invNumber);

    expect(actual).toBe(expected);
  } );
} );

it("inv", () => {
  const base = V.MINOR_OVER_d5;
  const invv = base.withInv();
  const closed = invv.withClose();

  expect(invv).toBe(V.fromRootIntervals(I.P1, I.m3, I.P5, I.d12));
  expect(closed).toBe(V.fromRootIntervals(I.P1, I.m3, I.d5, I.P5));
} );

it("inv2", () => {
  const base = V.MAJOR_OVER_a5;
  const invv = base.withInv();
  const closed = invv.withClose();

  expect(invv).toBe(V.fromRootIntervals(I.P1, I.M3, I.P5, I.a5));
  expect(closed).toBe(V.fromRootIntervals(I.P1, I.M3, I.P5, I.a5));
} );
