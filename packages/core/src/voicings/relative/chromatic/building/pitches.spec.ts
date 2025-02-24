/* eslint-disable camelcase */
import { A as P_A, AA as P_AA, Array as PitchArray, B as P_B, C as P_C, DD as P_DD, E as P_E, F as P_F, FF as P_FF, G as P_G } from "pitches/chromatic";
import { TestInit } from "tests";
import { POWER_CHORD, SEVENTH, THIRTEENTH_MAJ13_b5a9, TRIAD_MAJOR, Voicing } from "voicings/chromatic";
import fromPitches from "./pitches";

TestInit.chromaticVoicing();

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
