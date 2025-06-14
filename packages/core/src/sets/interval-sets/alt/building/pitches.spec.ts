/* eslint-disable camelcase */
import type { IntervalSet } from "../IntervalSet";
import type { PitchArray } from "pitches/alt";
import { Pitches as P } from "pitches/alt";
import { DegreeArray, Degrees as D } from "alt";
import { IntervalSets as IS } from "..";
import { fromDegrees, fromPitches } from "./pitches";

// eslint-disable-next-line @typescript-eslint/naming-convention
const { POWER_CHORD, SEVENTH, THIRTEENTH_MAJ13_b5a9, TRIAD_MAJOR } = IS;
const { A: P_A, B: P_B, C: P_C, DD: P_DD, E: P_E, F: P_F, G: P_G } = P;

describe.each(<[PitchArray, IntervalSet][]>[
  [[P_C, P_G], POWER_CHORD],
  [[P_C, P_E, P_G], TRIAD_MAJOR],
  [[P_C, P_E, P_G, P.Bb], SEVENTH],
  [[P_C, P_E, P.Gb, P_B, P_DD, P_F, P_A], THIRTEENTH_MAJ13_b5a9],
])("from pitches", (pitches: PitchArray, intervalSet: IntervalSet) => {
  it(`Pitches ${String(pitches)}. Expected intervalSet ${String(intervalSet)}`, () => {
    const actual = fromPitches(...pitches);

    expect(actual).toBe(intervalSet);
  } );
} );

describe.each(<[DegreeArray, IntervalSet][]>[
  [[D.I, D.V], POWER_CHORD],
  [[D.I, D.III, D.V], TRIAD_MAJOR],
  [[D.I, D.III, D.V, D.bVII], SEVENTH],
  [[D.I, D.III, D.bV, D.VII, D.aII, D.IV, D.VI], THIRTEENTH_MAJ13_b5a9],
])("from pitches", (degrees: DegreeArray, intervalSet: IntervalSet) => {
  it(`Degrees ${String(degrees)}. Expected intervalSet ${String(intervalSet)}`, () => {
    const actual = fromDegrees(...degrees);

    expect(actual).toBe(intervalSet);
  } );
} );
