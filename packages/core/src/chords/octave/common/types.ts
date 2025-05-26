import { SymbolicChord as Chord } from "../SymbolicChord";

export type ExtractChordParams<T> = T extends Chord<infer P, infer I> ? [P, I] : never;

export type ChordPitch<T> = ExtractChordParams<T>[0];

export type ChordInterval<T> = ExtractChordParams<T>[1];
