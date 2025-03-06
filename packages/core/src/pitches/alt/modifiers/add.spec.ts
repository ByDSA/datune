import { Intervals } from "intervals/alt";
import { Pitches as P } from "..";
import { add } from "./add";

it("add: minor second", () => {
  const i = Intervals.m2;

  expect(i).toBeDefined();

  const actual = add(P.C, i);
  const expected = P.Db;

  expect(actual).toBe(expected);
} );
