import { TestInit } from "tests";
import { Intervals } from "intervals/alt";
import { C, Db } from "../constants";
import { add } from "./add";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

it("add: minor second", () => {
  const i = Intervals.m2;

  expect(i).toBeDefined();

  const actual = add(C, i);
  const expected = Db;

  expect(actual).toBe(expected);
} );
