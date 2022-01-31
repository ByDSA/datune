import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "./constants";

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
