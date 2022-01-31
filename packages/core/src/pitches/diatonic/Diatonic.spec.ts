import { A, B, C, D, E, F, G } from "./constants";

describe.each([
  [C, 0],
  [D, 1],
  [E, 2],
  [F, 3],
  [G, 4],
  [A, 5],
  [B, 6],
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
