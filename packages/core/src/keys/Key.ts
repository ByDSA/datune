import type { Scale } from "scales/Scale";
import { NonEmptyArray } from "datils";
import { OctavePitch } from "pitches/OctavePitch";
import { SymbolicChord } from "../chords/octave/SymbolicChord";

export interface IKey<
INTERVAL,
P extends OctavePitch,
S extends Scale<INTERVAL, any>,
C extends SymbolicChord<P, INTERVAL>> {
  pitches: NonEmptyArray<P>;

  root: P;

  scale: S;

  length: number;

  hasChord(chord: C): boolean;

  hasPitches(...pitches: NonEmptyArray<P>): boolean;
}
