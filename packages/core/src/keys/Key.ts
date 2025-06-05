import type { Scale } from "scales/Scale";
import { NonEmptyArray } from "datils";
import { OctavePitch } from "pitches/OctavePitch";
import { SymbolicChord } from "../chords/octave/SymbolicChord";

export interface IKey<
INTERVAL,
P extends OctavePitch<INTERVAL>,
S extends Scale<INTERVAL, any>,
C extends SymbolicChord<P, INTERVAL>>
extends Iterable<P> {
  pitches: NonEmptyArray<P>;

  root: P;

  scale: S;

  length: number;

  hasChord(chord: C): boolean;

  hasPitches(...pitches: NonEmptyArray<P>): boolean;
}
