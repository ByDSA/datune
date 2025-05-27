import { NonEmptyArray } from "datils/datatypes";
import { Voicing } from "voicings/relative/Voicing";
import { PitchSet } from "sets/pitch-set/PitchSet";

export interface SymbolicChord<P, I> {
    // Queries
    has(pitch: P): boolean;
    hasAny(...pitches: NonEmptyArray<P>): boolean;
    hasAll(...pitches: NonEmptyArray<P>): boolean;
    hasRootIntervals(...rootIntervals: NonEmptyArray<I>): boolean;
    hasAnyRootIntervals(...rootIntervals: NonEmptyArray<I>): boolean;

    // Modifiers
    withRoot(root: P): SymbolicChord<P, I>;
    withBass(bass: P): SymbolicChord<P, I>;
    withShift(interval: I): SymbolicChord<P, I>;
    withShiftDown(interval: I): SymbolicChord<P, I>;
    withInv(n?: number): SymbolicChord<P, I>;
    withAdd(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    withRemove(...pitches: NonEmptyArray<P>): SymbolicChord<P, I>;
    withAddRootIntervals(...rootIntervals: NonEmptyArray<I>): SymbolicChord<P, I>;
    withRemoveRootIntervals(...rootIntervals: NonEmptyArray<I>): SymbolicChord<P, I>;
    withSus4(): SymbolicChord<P, I>;
    withSus2(): SymbolicChord<P, I>;

    // Properties
    rootIntervals: Readonly<NonEmptyArray<I>>;
    pitchSet: PitchSet<P, I>;
    pitches: Readonly<NonEmptyArray<P>>;
    size: number;
    root: P;
    bass: P;

    // Transform
    toRootVoicing: ()=> Voicing<I>;
}
