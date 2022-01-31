import { TestInit } from "tests";
import { cyclic, neg } from ".";
import { PERFECT_ELEVENTH, PERFECT_FIFTH, PERFECT_FOURTH } from "../constants";

TestInit.diatonicAltInterval();

describe.each([
  [neg(PERFECT_FIFTH), PERFECT_FOURTH],
  [PERFECT_FIFTH, PERFECT_FIFTH],
  [PERFECT_ELEVENTH, PERFECT_FOURTH],
])("tests", (interval, expected) => {
  it(`${String(interval)} => ${String(expected)}`, () => {
    const actual = cyclic(interval);

    expect(actual).toBe(expected);
  } );
} );
