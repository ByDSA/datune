import { SymbolicDegree } from "../octave/DegreeSymbolic";

export interface AbsolutePitch<D extends SymbolicDegree> {
    degree: D;
    octave: number;
}

export type AbsolutePitchAny = AbsolutePitch<SymbolicDegree>;