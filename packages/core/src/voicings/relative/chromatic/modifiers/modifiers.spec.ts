import type { Voicing } from "../Voicing";
import { fromRootIntervals } from "../building/rootIntervals";
import { Voicings as V } from "..";
import { inv } from ".";

const { M2, TRITONE } = V;
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
