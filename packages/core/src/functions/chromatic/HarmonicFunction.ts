import { Chord } from "chords/chromatic";
import { Key } from "keys/chromatic";
import { hash as hashKey } from "keys/chromatic/caching/hash";

const functionCache = new Map<string, Chord>();

export abstract class HarmonicFunction {
  getChord(key: Key): Chord {
    const fullHashCode = `(${hashKey(key)})|(${this.hashCode()})`;
    let chord = functionCache.get(fullHashCode);

    if (chord === undefined) {
      chord = this.calculateChord(key);
      functionCache.set(fullHashCode, chord);
    }

    return chord;
  }

  abstract hashCode(): string;

  protected abstract calculateChord(key: Key): Chord;
}
