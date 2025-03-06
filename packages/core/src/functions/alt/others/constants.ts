import type { Chord } from "chords/alt";
import type { Key } from "keys/alt";
import { Chords as C } from "chords/alt";
import { Intervals as I } from "intervals/alt";
import { Pitches as P } from "pitches/alt";
import { Voicings as V } from "voicings/alt";
import { Func as F } from "../Func";

export function initialize() {
  if (V7ALT)
    throw new Error("Already initialized");

  V7ALT = new (class A extends F {
    protected calculateChord(key: Key): Chord {
      const pitchV = P.add(key.root, I.P5);

      return C.fromRootVoicing(pitchV, V.SEVENTH_b5);
    }

    hashCode(): string {
      return "V7ALT";
    }

    toString(): string {
      return "V7ALT";
    }
  } )();
}

export let V7ALT: F;
