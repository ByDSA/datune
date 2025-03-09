import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "..";
import { add } from "./add";

it("add: minor second", () => {
  const i = I.m2;

  expect(i).toBeDefined();

  const actual = add(P.C, i);
  const expected = P.Db;

  expect(actual).toBe(expected);
} );
