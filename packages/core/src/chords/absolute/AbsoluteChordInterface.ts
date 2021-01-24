import { ChordInterface } from "../ChordInterface";
import { AbsolutePitch, SymbolicDegree } from "../../pitches";
import { Pattern } from "../../voicings/relative/Pattern";

export interface AbsoluteChordInterface<N extends AbsolutePitch<D>, D extends SymbolicDegree, P extends Pattern<D, any>> extends ChordInterface<N, P> {
}