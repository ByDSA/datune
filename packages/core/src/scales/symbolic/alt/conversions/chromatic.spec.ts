import { Scales as CScales } from "scales/chromatic";
import { TestInit } from "tests";
import { MAJOR, MINOR } from "../constants";
import { toChromatic } from "./chromatic";

TestInit.diatonicAltScale();

describe.each([
  [MAJOR, CScales.MAJOR],
  [MINOR, CScales.MINOR],
])("toChromatic", (base, expected) => {
  it(`${base.toString()} => ${expected.toString()}`, () => {
    const actual = toChromatic(base);

    expect(actual).toBe(expected);
  } );
} );
