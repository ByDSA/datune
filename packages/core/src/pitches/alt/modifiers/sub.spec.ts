import { TestInit } from "tests";
import { Intervals } from "intervals/alt";
import { B, C } from "../constants";
import { sub } from "./sub";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

it("sub: minor second", () => {
  const i = Intervals.m2;
  const actual = sub(C, i);
  const expected = B;

  expect(actual).toBe(expected);
} );
