import { MINOR_SECOND } from "intervals/alt";
import { TestInit } from "tests";
import { B, C, Db } from "../constants";
import add from "./add";
import sub from "./sub";

TestInit.diatonicAlt();
TestInit.diatonicAltInterval();

it("add: minor second", () => {
  const actual = add(C, MINOR_SECOND);
  const expected = Db;

  expect(actual).toBe(expected);
} );

it("sub: minor second", () => {
  const actual = sub(C, MINOR_SECOND);
  const expected = B;

  expect(actual).toBe(expected);
} );
