import * as C from "../constants";
import { neg } from "./neg";
import { cyclic } from "./cyclic";
import { TestInit } from "tests";

TestInit.diatonicAltInterval();

describe.each([
  [neg(C.PERFECT_FIFTH), C.PERFECT_FOURTH],
  [C.PERFECT_FIFTH, C.PERFECT_FIFTH],
  [C.PERFECT_ELEVENTH, C.PERFECT_FOURTH],
])("tests", (interval, expected) => {
  it(`${String(interval)} => ${String(expected)}`, () => {
    const actual = cyclic(interval);

    expect(actual).toBe(expected);
  } );
} );
