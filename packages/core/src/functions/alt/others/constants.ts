import type { Chord } from "chords/alt";
import type { Key } from "keys/alt";
import { Chords } from "chords/alt";
import { Intervals } from "intervals/alt";
import { Pitches } from "pitches/alt";
import { Voicings } from "voicings/alt";
import { HarmonicFunction } from "../HarmonicFunction";

export function initialize() {
  V7ALT = new (class A extends HarmonicFunction {
    protected calculateChord(key: Key): Chord {
      const pitchV = Pitches.add(key.root, Intervals.P5);

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
