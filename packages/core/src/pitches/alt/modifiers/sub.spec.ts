import { B, C } from "../constants";
import { sub } from "./sub";
import { TestInit } from "tests";
import { Intervals } from "intervals/alt";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

it("sub: minor second", () => {
  const i = Intervals.MINOR_SECOND;
  const actual = sub(C, i);
  const expected = B;

  expect(actual).toBe(expected);
} );
