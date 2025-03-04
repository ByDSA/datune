import { TestInit } from "tests";
import { MAJOR, MINOR } from "./constants";
import { Scale } from "./Scale";

TestInit.diatonicAltScale();

describe.each([
  [MAJOR, "P1-M2-M3-P4-P5-M6-M7"],
  [MINOR, "P1-M2-m3-P4-P5-m6-m7"],
])("toString", (scale: Scale, expected: string) => {
  it(`${scale} => ${expected}`, () => {
    const actual = String(scale);

    expect(actual).toBe(expected);
  } );
} );
