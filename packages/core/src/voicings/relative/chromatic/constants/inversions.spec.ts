import { TestInit } from "tests";
import { inv } from "../modifiers";
import getInversionOf from "./inversionMap";
import { TRIAD_MAJOR, TRIAD_MINOR } from "./n3";

TestInit.chromaticVoicing();
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
