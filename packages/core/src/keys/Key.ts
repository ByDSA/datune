import type { Arrays } from "@datune/utils";
import type { Scale } from "scales/Scale";
import { OctavePitch } from "pitches/OctavePitch";
import { Chord } from "../chords/Chord";

export interface IKey<
INTERVAL,
P extends OctavePitch,
S extends Scale<INTERVAL, any>,
C extends Chord<P>> {
  pitches: Arrays.NonEmpty<P>;

  root: P;

  scale: S;

  length: number;

  hasChord(chord: C): boolean;

  hasPitches(...pitches: Arrays.NonEmpty<P>): boolean;
}
