import type { Chord } from "chords/alt";
import type { Key } from "keys/alt";

export abstract class Func {
  private static functionCache = new Map<string, Chord | null>();

  getChord(key: Key): Chord | null {
    const id = `${key} ${this.toString()}`;
    let chord: Chord | null | undefined = Func.functionCache.get(id);

    if (chord === undefined) {
      chord = this.calculateChord(key);

      Func.functionCache.set(id, chord);

      if (!chord)
        return null;
    }

    return chord;
  }

    protected abstract calculateChord(key: Key): Chord | null;
}
