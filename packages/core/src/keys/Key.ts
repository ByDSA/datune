import type { Scale } from "scales/Scale";
import { NonEmptyArray } from "datils";
import { OctavePitch } from "pitches/OctavePitch";
import { IPitchSet } from "sets/pitch-set/IPitchSet";
import { IFunc } from "functions/IFunc";
import { SymbolicChord } from "../chords/octave/SymbolicChord";

export interface IKey<
INTERVAL,
P extends OctavePitch<INTERVAL>,
S extends Scale<INTERVAL, any>,
C extends SymbolicChord<P, INTERVAL>,
PS extends IPitchSet<P, INTERVAL> >
extends Iterable<P> {
  pitches: Readonly<NonEmptyArray<P>>;

  pitchSet: PS;

  root: P;

  scale: S;

  length: number;

  hasChord(chord: C): boolean;

  hasPitches(...pitches: NonEmptyArray<P>): boolean;

  getChord(func: IFunc<P, C>): C;

  withMode(n?: number): IKey<INTERVAL, P, S, C, PS>;

  withRoot(root: P): IKey<INTERVAL, P, S, C, PS>;
  withScale(scale: S): IKey<INTERVAL, P, S, C, PS>;

  triadRootChord: C | null;

  seventhRootChord: C | null;
}
