import { TestInit } from "tests";
import * as C from "../constants";
import { expectInterval } from "../tests/interval";
import { neg } from "./neg";
import { cyclic } from "./cyclic";

TestInit.diatonicAltInterval();

describe.each([
  [neg(C.P5), C.P4],
  [C.P4, C.P4],
  [C.P11, C.P4],
])("tests", (interval, expected) => {
  it(`${String(interval)} => ${String(expected)}`, () => {
    const actual = cyclic(interval);

    expectInterval(actual, expected);
  } );
} );
