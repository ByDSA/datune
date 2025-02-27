/* eslint-disable camelcase */
import * as Voicings from "../constants";
import Voicing from "../Voicing";
import { fromPitches } from "./pitches";
import { Pitches, PitchArray } from "pitches/chromatic";
import { TestInit } from "tests";

TestInit.chromaticVoicing();
// eslint-disable-next-line @typescript-eslint/naming-convention
const { POWER_CHORD, SEVENTH, THIRTEENTH_MAJ13_b5a9, TRIAD_MAJOR } = Voicings;
const { A: P_A, AA: P_AA, B: P_B, C: P_C, DD: P_DD, E: P_E, F: P_F, FF: P_FF, G: P_G } = Pitches;

describe.each(<[PitchArray, Voicing][]>[
  [[P_C, P_G], POWER_CHORD],
  [[P_C, P_E, P_G], TRIAD_MAJOR],
  [[P_C, P_E, P_G, P_AA], SEVENTH],
  [[P_C, P_E, P_FF, P_B, P_DD, P_F, P_A], THIRTEENTH_MAJ13_b5a9],
])("voicing's pitches", (pitches: PitchArray, voicing: Voicing) => {
  it(`Pitches ${String(pitches)}. Expected voicing ${String(voicing)}`, () => {
    const actual = fromPitches(...pitches);

    expect(actual).toBe(voicing);
  } );
} );
