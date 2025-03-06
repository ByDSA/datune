import { Voicings as V } from "..";
import { inv } from "../modifiers";
import { getNumInversionOf } from "./inversionMap";

const { TRIAD_MAJOR, TRIAD_MINOR } = V;

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
    const actual = getNumInversionOf(voicing);

    expect(actual).toBe(expected);
  } );
} );
