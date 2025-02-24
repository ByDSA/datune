import { Chord } from "chords/chromatic";
import { hash as keyHash, Key } from "keys/chromatic";

const functionCache = new Map<string, Chord>();

export default abstract class HarmonicFunction {
  getChord(key: Key): Chord {
    const fullHashCode = `(${keyHash(key)})|(${this.hashCode()})`;
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
