import { C, Db } from "../constants";
import { add } from "./add";
import { TestInit } from "tests";
import { Intervals } from "intervals/alt";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

it("add: minor second", () => {
  const i = Intervals.MINOR_SECOND;

  expect(i).toBeDefined();

  const actual = add(C, i);
  const expected = Db;

  expect(actual).toBe(expected);
} );
