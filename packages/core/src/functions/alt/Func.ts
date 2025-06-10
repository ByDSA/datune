import type { Chord } from "chords/alt";
import type { Key } from "keys/alt";

export abstract class Func {
  private static functionCache = new Map<string, Chord>();

  getChord(key: Key): Chord {
    const id = `${key} ${this.toString()}`;
    let chord: Chord | undefined = Func.functionCache.get(id);

    if (chord === undefined) {
      chord = this.calculateChord(key);

      Func.functionCache.set(id, chord);
    }

    return chord;
  }

    protected abstract calculateChord(key: Key): Chord;
}
