import { Arrays } from "@datune/utils";
import { Chord } from "../chords/Chord";
import { OctavePitch } from "pitches/OctavePitch";
import { Scale } from "scales/Scale";

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
