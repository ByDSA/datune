import { Intervals as I } from "intervals/chromatic";
import { Pitches as AP } from "pitches/alt";
import { Pitches as P } from ".";

const { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } = P;

describe.each([
  [C, 0],
  [CC, 1],
  [D, 2],
  [DD, 3],
  [E, 4],
  [F, 5],
  [FF, 6],
  [G, 7],
  [GG, 8],
  [A, 9],
  [AA, 10],
  [B, 11],
])("valueOf", (pitch, expected) => {
  it(`${pitch} => ${expected}`, () => {
    const actual = +pitch;

    expect(actual).toBe(expected);
  } );
} );

it("sorting", () => {
  const expected = [C, E, G];
  const actual = [E, G, C].sort();

  expect(actual).toEqual(expected);
} );

describe("modifiers", () => {
  it("add", () => {
    const actual = C.withAdd(I.P5);
    const expected = G;

    expect(actual).toBe(expected);
  } );

  it("sub", () => {
    const actual = C.withSub(I.P5);
    const expected = F;

    expect(actual).toBe(expected);
  } );
} );

it("toALt", () => {
  const expected = AP.AA;
  const actual = P.AA.toAlt();

  expect(actual).toBe(expected);
} );
