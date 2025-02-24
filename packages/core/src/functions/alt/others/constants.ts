/* eslint-disable import/no-mutable-exports */
/* eslint-disable camelcase */
import { Chord, fromRootVoicing } from "chords/alt";
import { PERFECT_FIFTH } from "intervals/alt";
import { Key } from "keys/alt";
import { add as pitchAdd } from "pitches/alt";
import { SEVENTH_b5 } from "voicings/alt";
import HarmonicFunction from "../HarmonicFunction";

export function initialize() {
  V7ALT = new (class A extends HarmonicFunction {
    // eslint-disable-next-line class-methods-use-this
    protected calculateChord(key: Key): Chord {
      const pitchV = pitchAdd(key.root, PERFECT_FIFTH);

      return fromRootVoicing(pitchV, SEVENTH_b5);
    }

    // eslint-disable-next-line class-methods-use-this
    hashCode(): string {
      return "V7ALT";
    }

    // eslint-disable-next-line class-methods-use-this
    toString(): string {
      return "V7ALT";
    }
  } )();
}

export let V7ALT: HarmonicFunction;
