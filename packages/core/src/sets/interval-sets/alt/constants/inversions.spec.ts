import { IntervalSets as IS } from "..";
import { inv } from "../modifiers/inv";
import { getNumInversionOf } from "./inversionMap";

const { COMMON_NON_INVERSIONS, TRIAD_MAJOR, TRIAD_MINOR } = IS;

describe.each([
  [TRIAD_MAJOR, 0],
  [inv(TRIAD_MAJOR), 1],
  [inv(TRIAD_MAJOR, 2), 2],
  [inv(TRIAD_MAJOR, 3), 0],
  [TRIAD_MINOR, 0],
  [inv(TRIAD_MINOR), 1],
  [inv(TRIAD_MINOR, 2), 2],
  [inv(TRIAD_MINOR, 3), 0],
])("tests", (intervalSet, expected) => {
  const intervalSetIntervalsName = String(intervalSet.rootIntervals);

  it(`${intervalSetIntervalsName} => ${expected}`, () => {
    const actual = getNumInversionOf(intervalSet);

    expect(actual).toBe(expected);
  } );
} );

it("allNonInversions is fine", () => {
  const intervalSets = COMMON_NON_INVERSIONS;

  for (const v of intervalSets) {
    let pInv = v;

    for (let i = 1; i < v.size; i++) {
      pInv = inv(pInv);

      if (pInv === v) // simétrico
        break;

      expect(intervalSets).not.toContain(pInv);
    }
  }
} );
