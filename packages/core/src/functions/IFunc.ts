import { SymbolicChord } from "chords/octave/SymbolicChord";

export interface IFunc<P, C extends SymbolicChord<P, any>> {
  getChord(root: P): C;
}
