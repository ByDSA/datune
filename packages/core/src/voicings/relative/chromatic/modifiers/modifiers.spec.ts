import type { Voicing } from "../Voicing";
import { TestInit } from "tests";
import { fromRootIntervals } from "../building/rootIntervals";
import { M2, TRITONE } from "../constants";
import { inv } from ".";

TestInit.chromaticVoicing();

const map: any[] = [
  [M2, fromRootIntervals(0, 10)],
  [TRITONE, TRITONE],
];

describe.each(map)("inv", (voicing: Voicing, expectedVoicing: Voicing) => {
  it(`${String(voicing)} inv=${String(expectedVoicing)}`, () => {
    const actual = inv(voicing);

    expect(actual).toBe(expectedVoicing);
  } );
} );
