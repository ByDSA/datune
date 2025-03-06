import { Pitches as P } from "..";
import { fromInt } from "./int";

const { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } = P;

it("should initialize 0 to 11", () => {
  expect(fromInt(0)).toBe(C);
  expect(fromInt(1)).toBe(CC);
  expect(fromInt(2)).toBe(D);
  expect(fromInt(3)).toBe(DD);
  expect(fromInt(4)).toBe(E);
  expect(fromInt(5)).toBe(F);
  expect(fromInt(6)).toBe(FF);
  expect(fromInt(7)).toBe(G);
  expect(fromInt(8)).toBe(GG);
  expect(fromInt(9)).toBe(A);
  expect(fromInt(10)).toBe(AA);
  expect(fromInt(11)).toBe(B);
} );

it("< 0", () => {
  expect(fromInt(-1)).toBe(B);
  expect(fromInt(-12)).toBe(C);
} );

it("> 11", () => {
  expect(fromInt(12)).toBe(C);
  expect(fromInt(25)).toBe(CC);
} );
