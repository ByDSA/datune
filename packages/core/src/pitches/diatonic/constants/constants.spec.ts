import { A, ALL, B, C, D, E, F, G, NUMBER } from ".";
import Diatonic from "../Diatonic";

it("valueOf()", () => {
  expect(C.valueOf()).toBe(0);
  expect(D.valueOf()).toBe(1);
  expect(E.valueOf()).toBe(2);
  expect(F.valueOf()).toBe(3);
  expect(G.valueOf()).toBe(4);
  expect(A.valueOf()).toBe(5);
  expect(B.valueOf()).toBe(6);
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

    it("defined ", () => {
      expect(C).toBeDefined();
      expect(D).toBeDefined();
      expect(E).toBeDefined();
      expect(F).toBeDefined();
      expect(G).toBeDefined();
      expect(A).toBeDefined();
      expect(B).toBeDefined();
    } );

    it("all length=12", () => {
      expect(ALL.length).toBe(7);
    } );

    it("all values (unordered)", () => {
      const diatonics: Diatonic[] = [
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
