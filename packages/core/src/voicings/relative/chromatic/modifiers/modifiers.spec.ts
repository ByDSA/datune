/* eslint-disable camelcase */
import { TestInit } from "tests";
import { inv } from ".";
import { fromRootIntervals } from "../building";
import { MAJOR_SECOND, TRITONE } from "../constants";
import Voicing from "../Voicing";

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
