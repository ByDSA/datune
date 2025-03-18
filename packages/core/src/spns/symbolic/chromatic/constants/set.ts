import type { SpnArray } from "../Array";
import type { Spn } from "../Spn";
import { lockr } from "@datune/utils/immutables";
import { ALL as ALL_PITCHES } from "pitches/chromatic/constants";
import { fromPitchOctave } from "../building/pitch-octave";

export function initializeAll() {
  ALL = calcAll();
  lockr(ALL);
}

function calcAll(): SpnArray {
  const ret = [];

  for (let octave = -1; octave <= 9; octave++) {
    for (const pitch of ALL_PITCHES) {
      const spn = fromPitchOctave(pitch, octave) as Spn;

      ret.push(spn);
    }
  }

  return ret as SpnArray;
}

export let ALL: SpnArray;
