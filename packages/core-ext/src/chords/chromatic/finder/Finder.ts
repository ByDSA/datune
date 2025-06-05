import type { Chord } from "@datune/core/chords/chromatic";
import { type PitchArray, type Pitch, Pitches } from "@datune/core/pitches/chromatic";
import { Chords } from "@datune/core/chords/octave/chromatic";
import { PitchSets as PS } from "@datune/core";
import { PitchSet } from "@datune/core/sets/pitch-set/chromatic/PitchSet";
import { getCombinations } from "datils/math/combinatorics";

export class Finder {
  #notInversions: boolean;

  #notes?: PitchArray;

  #maxLength: number;

  #minLength: number;

  #bass?: Pitch;

  #root?: Pitch;

  #bassInPitchSet: boolean;

  constructor() {
    this.#maxLength = 12;
    this.#minLength = 2;
    this.#notInversions = false;
    this.#bassInPitchSet = true;
  }

  notInversions() {
    this.#notInversions = true;

    return this;
  }

  containsNote(...notes: PitchArray): Finder {
    this.#notes = notes;

    return this;
  }

  bassInPitchSetNotRequired(): Finder {
    this.#bassInPitchSet = false;

    return this;
  }

  find(): Chord[] {
    const pitches = Pitches.ALL;
    const pitchSets: PitchSet[] = [];

    for (let i = this.#minLength; i <= this.#maxLength; i++) {
      let pss = getCombinations(pitches, i).map(a=>PS.fromPitches(...a));

      if (this.#notes !== undefined) {
        pss = pss.filter(ps=>{
          const withBass = this.#bass ? ps.withAdded(this.#bass) : ps;

          return withBass.hasAll(...this.#notes as PitchArray);
        } );
      }

      pitchSets.push(...pss);
    }

    const chordsSet = new Set<Chord>();

    for (const ps of pitchSets) {
      const possibleRoots = this.#root ? [this.#root] : Pitches.ALL;
      const possibleBass = this.#bass ? [this.#bass] : Pitches.ALL;

      for (const root of possibleRoots) {
        for (const bass of possibleBass) {
          if (this.#bassInPitchSet && !ps.has(bass))
            continue;

          if (this.#notInversions && ps.has(bass) && bass !== root)
            continue;

          const chord = Chords.from( {
            bass,
            pitchSet: ps,
            root,
          } );

          chordsSet.add(chord);
        }
      }
    }

    return [...chordsSet];
  }

  maxChordLength(n: number): Finder {
    this.#maxLength = n;

    return this;
  }

  bass(r: Pitch): Finder {
    this.#bass = r;

    return this;
  }

  root(r: Pitch): Finder {
    this.#bass = r;

    return this;
  }

  minChordLength(n: number): Finder {
    this.#minLength = n;

    return this;
  }
}
