import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "..";
import { shiftDown } from "./shift-down";

it("shiftDown: minor second", () => {
  const i = I.m2;
  const actual = shiftDown(P.C, i);
  const expected = P.B;

  expect(actual).toBe(expected);
} );
