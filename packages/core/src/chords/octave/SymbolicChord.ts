import { NonEmptyArray } from "datils/datatypes";
import { Voicing } from "voicings/relative/Voicing";
import { PitchSet } from "sets/pitch-set/PitchSet";

export interface SymbolicChord<P, I> {
    has(pitch: P): boolean;
    hasAny(...pitches: NonEmptyArray<P>): boolean;
    hasAll(...pitches: NonEmptyArray<P>): boolean;
    withRoot(root: P): SymbolicChord<P, I>;
    withBass(bass: P): SymbolicChord<P, I>;
    withShift(interval: I): SymbolicChord<P, I>;
    withShiftDown(interval: I): SymbolicChord<P, I>;
    withInv(n?: number): SymbolicChord<P, I>;
    withAdd(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    withRemove(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    rootIntervals: Readonly<NonEmptyArray<I>>;
    toRootVoicing: ()=> Voicing<I>;
    pitchSet: PitchSet<P, I>;
    pitches: Readonly<NonEmptyArray<P>>;
    size: number;
    root: P;
    bass: P;
}
