import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "..";
import { shift } from "./shift";

it("shift: minor second", () => {
  const i = I.m2;

  expect(i).toBeDefined();

  const actual = shift(P.C, i);
  const expected = P.Db;

  expect(actual).toBe(expected);
} );
