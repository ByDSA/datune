import type { PitchArray, Pitch } from "@datune/core/pitches/alt";
import { Chord } from "@datune/core/chords/octave/alt/Chord";
import { Chords as C } from "@datune/core/chords/octave/alt";
import { getCombinations } from "datils/math/combinatorics";
import { Pitches as P } from "@datune/core/pitches/alt";
import { type PitchSet, PitchSets as PS } from "@datune/core/sets/pitch-set/alt";

export class Finder {
  #notes?: PitchArray;

  #maxLength: number;

  #minLength: number;

  #notInversions: boolean;

  #bassInPitchSet: boolean;

  #bass?: Pitch;

  #root?: Pitch;

  #pitches?: PitchArray;

  constructor() {
    this.#maxLength = 12;
    this.#minLength = 2;
    this.#notInversions = false;
    this.#bassInPitchSet = true;
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
    const pitches = this.#pitches ?? P.ALL;
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
      const possibleRoots = this.#root ? [this.#root] : P.ALL;
      const possibleBass = this.#bass ? [this.#bass] : P.ALL;

      for (const root of possibleRoots) {
        for (const bass of possibleBass) {
          if (this.#bassInPitchSet && !ps.has(bass))
            continue;

          if (this.#notInversions && ps.has(bass) && bass !== root)
            continue;

          const chord = C.from( {
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

  notInversions(): Finder {
    this.#notInversions = true;

    return this;
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
    this.#root = r;

    return this;
  }

  minChordLength(n: number): Finder {
    this.#minLength = n;

    return this;
  }
}
