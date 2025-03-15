import { Chord } from "chords/chromatic";
import { Key } from "keys/chromatic";
import { getObjId as keyGetObjId } from "keys/chromatic/caching/cache";

const functionCache = new Map<string, Chord>();

export abstract class Func {
  getChord(key: Key): Chord {
    const id = `(${keyGetObjId(key)})|(${this.getId()})`;
    let chord = functionCache.get(id);

    if (chord === undefined) {
      chord = this.calculateChord(key);
      functionCache.set(id, chord);
    }

    return chord;
  }

  abstract getId(): string;

  protected abstract calculateChord(key: Key): Chord;
}
