import type { Chord } from "chords/chromatic";
import type { Pitch } from "chromatic";
import { getObjId as pitchGetObjId } from "pitches/chromatic/caching/id";

const functionCache = new Map<string, Chord>();

export abstract class Func {
  getChord(root: Pitch): Chord {
    const id = `(${pitchGetObjId(root)})|(${this.getId()})`;
    let chord = functionCache.get(id);

    if (chord === undefined) {
      chord = this.calculateChord(root);
      functionCache.set(id, chord);
    }

    return chord;
  }

  abstract getId(): string;

  protected abstract calculateChord(root: Pitch): Chord;
}
