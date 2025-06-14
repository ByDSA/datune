import { IntervalSets as IS } from "..";
import { inv } from "../modifiers";
import { getNumInversionOf } from "./inversionMap";

const { TRIAD_MAJOR, TRIAD_MINOR } = IS;

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
