import { Pitches as P } from ".";

describe("static properties should be defined", () => {
  it("constants", () => {
    expect(P.C).toBeDefined();
    expect(P.D).toBeDefined();
    expect(P.E).toBeDefined();
    expect(P.F).toBeDefined();
    expect(P.G).toBeDefined();
    expect(P.A).toBeDefined();
    expect(P.B).toBeDefined();
    expect(P.ALL).toBeDefined();
    expect(P.NUMBER).toBeDefined();
  } );
} );

describe("lazy properties should be defined", () => {
  it("building", () => {
    expect(P.fromInt).toBeDefined();
  } );

  it("conversions", () => {
    expect(P.toChromatic).toBeDefined();
  } );

  it("modifiers", () => {
    expect(P.add).toBeDefined();
    expect(P.sub).toBeDefined();
  } );
} );

describe.each([
  [P.C, 0],
  [P.D, 1],
  [P.E, 2],
  [P.F, 3],
  [P.G, 4],
  [P.A, 5],
  [P.B, 6],
])("valueOf", (pitch, expected) => {
  it(`${pitch} => ${expected}`, () => {
    const actual = +pitch;

    expect(actual).toBe(expected);
  } );
} );

it("sorting", () => {
  const expected = [P.C, P.E, P.G];
  const actual = [P.E, P.G, P.C].sort();

  expect(actual).toEqual(expected);
} );
