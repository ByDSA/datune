import type { Chord } from "chords/chromatic";
import type { Key } from "keys/chromatic";
import { Chords as C } from "chords/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Voicings as V } from "voicings/chromatic";
import { Func } from "../Func";

export function initialize() {
  if (V7ALT)
    throw new Error("Already initialized");

  V7ALT = new (class A extends Func {
    protected calculateChord(key: Key): Chord {
      const pitchV = P.add(key.root, I.P5);

      return C.fromRootVoicing(pitchV, V.SEVENTH_b5);
    }

    getId(): string {
      return "V7ALT";
    }
  } )();
}

export let V7ALT: Func;
