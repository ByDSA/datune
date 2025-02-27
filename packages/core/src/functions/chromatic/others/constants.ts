import { HarmonicFunction } from "../HarmonicFunction";
import { Chord, Chords } from "chords/chromatic";
import { Intervals } from "intervals/chromatic";
import { Key } from "keys/chromatic";
import { Pitches } from "pitches/chromatic";
import { Voicings } from "voicings/chromatic";

export function initialize() {
  V7ALT = new (class A extends HarmonicFunction {
    protected calculateChord(key: Key): Chord {
      const pitchV = Pitches.add(key.root, Intervals.PERFECT_FIFTH);

      return Chords.fromRootVoicing(pitchV, Voicings.SEVENTH_b5);
    }

    hashCode(): string {
      return "V7ALT";
    }
  } )();
}

export let V7ALT: HarmonicFunction;
