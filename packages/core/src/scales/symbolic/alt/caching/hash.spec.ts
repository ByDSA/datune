import { TestInit } from "tests";
import { MAJOR, MINOR } from "../constants";
import { Scale } from "../Scale";
import { hash } from "./hash";

TestInit.diatonicAltScale();

describe.each([
  [MAJOR, "+0P|+1M|+2M|+3P|+4P|+5M|+6M"],
  [MINOR, "+0P|+1M|+2m|+3P|+4P|+5m|+6m"],
])("tests", (scale: Scale, expected: string) => {
  it(`${scale} => ${expected}`, () => {
    const actual = hash(scale);

    expect(actual).toBe(expected);
  } );
} );
