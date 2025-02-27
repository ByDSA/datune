import { inv } from "../modifiers/inv";
import getInversionOf from "./inversionMap";
import { TRIAD_MAJOR, TRIAD_MINOR } from "./n3";
import { COMMON_NON_INVERSIONS } from "./sets";
import { TestInit } from "tests";

TestInit.diatonicAltVoicing();

describe.each([
  [TRIAD_MAJOR, 0],
  [inv(TRIAD_MAJOR), 1],
  [inv(TRIAD_MAJOR, 2), 2],
  [inv(TRIAD_MAJOR, 3), 0],
  [TRIAD_MINOR, 0],
  [inv(TRIAD_MINOR), 1],
  [inv(TRIAD_MINOR, 2), 2],
  [inv(TRIAD_MINOR, 3), 0],
])("tests", (voicing, expected) => {
  const voicingIntervalsName = String(voicing.rootIntervals);

  it(`${voicingIntervalsName} => ${expected}`, () => {
    const actual = getInversionOf(voicing);

    expect(actual).toBe(expected);
  } );
} );

it("allNonInversions is fine", () => {
  const voicings = COMMON_NON_INVERSIONS;

  for (const v of voicings) {
    let pInv = v;

    for (let i = 1; i < v.length; i++) {
      pInv = inv(pInv);

      if (pInv === v) // simétrico
        break;

      expect(voicings).not.toContain(pInv);
    }
  }
} );
