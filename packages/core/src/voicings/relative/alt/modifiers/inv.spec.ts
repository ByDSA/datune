import { TestInit } from "tests";
import { TRIAD_MAJOR } from "../constants";
import Voicing from "../Voicing";
import inv from "./inv";

TestInit.diatonicAltVoicing();
describe.each([
  [TRIAD_MAJOR, 0, TRIAD_MAJOR],
  [TRIAD_MAJOR, 1, inv(TRIAD_MAJOR)],
  [TRIAD_MAJOR, -1, inv(TRIAD_MAJOR, 2)],
])("tests", (base: Voicing, invNumber: number, expected: Voicing) => {
  const baseName = String(base) ?? "undefined";
  const expectedName = String(base) ?? "undefined";

  it(`${baseName} invNumber=${invNumber} => ${expectedName}`, () => {
    const actual = inv(base, invNumber);

    expect(actual).toBe(expected);
  } );
} );
