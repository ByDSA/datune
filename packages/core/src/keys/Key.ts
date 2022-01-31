import { Arrays } from "@datune/utils";
import OctavePitch from "pitches/OctavePitch";
import { Scale } from "scales";
import { SymbolicChord } from "../chords";

export default interface Key<
INTERVAL,
P extends OctavePitch,
S extends Scale<INTERVAL, any>,
C extends SymbolicChord<P>> {
  pitches: Arrays.NonEmpty<P>;

  root: P;

  scale: S;

  length: number;

  hasChord(chord: C): boolean;

  hasPitches(...pitches: Arrays.NonEmpty<P>): boolean;
}
