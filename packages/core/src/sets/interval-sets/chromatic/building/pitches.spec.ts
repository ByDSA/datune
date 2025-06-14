/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import type { PitchArray } from "pitches/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { IntervalSets as IS } from "..";
import { fromPitches } from "./pitches";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { POWER_CHORD, SEVENTH, THIRTEENTH_MAJ13_b5a9, TRIAD_MAJOR } = IS;
const { A: P_A, AA: P_AA, B: P_B, C: P_C, DD: P_DD, E: P_E, F: P_F, FF: P_FF, G: P_G } = P;

describe.each(<[PitchArray, IntervalSet][]>[
  [[P_C, P_G], POWER_CHORD],
  [[P_C, P_E, P_G], TRIAD_MAJOR],
  [[P_C, P_E, P_G, P_AA], SEVENTH],
  [[P_C, P_E, P_FF, P_B, P_DD, P_F, P_A], THIRTEENTH_MAJ13_b5a9],
])("intervalSet's pitches", (pitches: PitchArray, intervalSet: IntervalSet) => {
  it(`Pitches ${String(pitches)}. Expected intervalSet ${String(intervalSet)}`, () => {
    const actual = fromPitches(...pitches);

    expect(actual).toBe(intervalSet);
  } );
} );
