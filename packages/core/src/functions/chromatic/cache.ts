import type { Chord } from "chords/chromatic";

const functionCache = new Map<string, Chord>();

type Props = {
  getId: ()=> string;
  calc: ()=> Chord;
};
export function getOrCalc( { getId, calc }: Props): Chord {
  const id = getId();
  let chord = functionCache.get(id);

  if (chord === undefined) {
    chord = calc();
    functionCache.set(id, chord);
  }

  return chord;
}
