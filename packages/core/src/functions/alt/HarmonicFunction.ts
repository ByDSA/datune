import { Chord } from "chords/alt";
import { Key } from "keys/alt";

export default abstract class HarmonicFunction {
  private static functionCache = new Map<string, Chord | null>();

  getChord(key: Key): Chord | null {
    const hashCode = `${key} ${this.toString()}`;
    let chord: Chord | null | undefined = HarmonicFunction.functionCache.get(hashCode);

    if (chord === undefined) {
      chord = this.calculateChord(key);

      HarmonicFunction.functionCache.set(hashCode, chord);

      if (!chord)
        return null;
    }

    return chord;
  }

    protected abstract calculateChord(key: Key): Chord | null;
}
