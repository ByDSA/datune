import type { Pitch } from "../Pitch";
import { A, ALL, B, C, D, E, F, G, NUMBER } from ".";

it("valueOf()", () => {
  expect(C.valueOf()).toBe(0);
  expect(D.valueOf()).toBe(1);
  expect(E.valueOf()).toBe(2);
  expect(F.valueOf()).toBe(3);
  expect(G.valueOf()).toBe(4);
  expect(A.valueOf()).toBe(5);
  expect(B.valueOf()).toBe(6);
} );

describe.each([
  [C, 0],
  [D, 1],
  [E, 2],
  [F, 3],
  [G, 4],
  [A, 5],
  [B, 6],
])("to int", (pitch, expected) => {
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

describe("sets", () => {
  it("number", () => {
    expect(NUMBER).toBe(7);
  } );

  describe("values", () => {
    it("always same value", () => {
      expect(C).toBe(C);
      expect(D).toBe(D);
      expect(E).toBe(E);
      expect(F).toBe(F);
      expect(G).toBe(G);
      expect(A).toBe(A);
      expect(B).toBe(B);
    } );

    it("defined", () => {
      expect(C).toBeDefined();
      expect(D).toBeDefined();
      expect(E).toBeDefined();
      expect(F).toBeDefined();
      expect(G).toBeDefined();
      expect(A).toBeDefined();
      expect(B).toBeDefined();
    } );

    it("all length=12", () => {
      expect(ALL).toHaveLength(7);
    } );

    it("all values (unordered)", () => {
      const diatonics: Pitch[] = [
        C,
        D,
        E,
        F,
        G,
        A,
        B,
      ];

      for (const diatonic of diatonics)
        expect(ALL).toContain(diatonic);
    } );
  } );
} );
