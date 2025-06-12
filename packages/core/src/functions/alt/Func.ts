import type { Pitch } from "alt";
import type { Chord } from "chords/alt";

export abstract class Func {
  private static functionCache = new Map<string, Chord>();

  getChord(root: Pitch): Chord {
    const id = `${root} ${this.toString()}`;
    let chord: Chord | undefined = Func.functionCache.get(id);

    if (chord === undefined) {
      chord = this.calculateChord(root);

      Func.functionCache.set(id, chord);
    }

    return chord;
  }

    protected abstract calculateChord(root: Pitch): Chord;
}
