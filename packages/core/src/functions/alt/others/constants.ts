import { HarmonicFunction } from "../HarmonicFunction";
import type { Chord } from "chords/alt";
import { Chords } from "chords/alt";
import { Intervals } from "intervals/alt";
import type { Key } from "keys/alt";
import { Pitches } from "pitches/alt";
import { Voicings } from "voicings/alt";

export function initialize() {
  V7ALT = new (class A extends HarmonicFunction {
    protected calculateChord(key: Key): Chord {
      const pitchV = Pitches.add(key.root, Intervals.PERFECT_FIFTH);

      return Chords.fromRootVoicing(pitchV, Voicings.SEVENTH_b5);
    }

    hashCode(): string {
      return "V7ALT";
    }

    toString(): string {
      return "V7ALT";
    }
  } )();
}

export let V7ALT: HarmonicFunction;
