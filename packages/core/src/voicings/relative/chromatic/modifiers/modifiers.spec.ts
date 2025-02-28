import { fromRootIntervals } from "../building/rootIntervals";
import { MAJOR_SECOND, TRITONE } from "../constants";
import type { Voicing } from "../Voicing";
import { inv } from ".";
import { TestInit } from "tests";

TestInit.chromaticVoicing();

const map: any[] = [
  [MAJOR_SECOND, fromRootIntervals(0, 10)],
  [TRITONE, TRITONE],
];

describe.each(map)("inv", (voicing: Voicing, expectedVoicing: Voicing) => {
  it(`${String(voicing)} inv=${String(expectedVoicing)}`, () => {
    const actual = inv(voicing);

    expect(actual).toBe(expectedVoicing);
  } );
} );
