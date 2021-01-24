import { SymbolicDegree } from "../../pitches";
import { Pattern } from "../../voicings";
import { ChordInterface } from "../ChordInterface";

export interface SymbolicChord<D extends SymbolicDegree, P extends Pattern<D, any>, SELF> extends ChordInterface<D, P> {
    rootIndex: number;
    inversionNumber: number;
    root: D;
    withInv(n: number): SELF;
}