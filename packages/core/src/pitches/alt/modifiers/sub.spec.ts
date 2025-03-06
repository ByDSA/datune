import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "..";
import { sub } from "./sub";

it("sub: minor second", () => {
  const i = I.m2;
  const actual = sub(P.C, i);
  const expected = P.B;

  expect(actual).toBe(expected);
} );
