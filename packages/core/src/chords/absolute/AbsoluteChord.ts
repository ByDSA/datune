import { SymbolicSPN } from "spns/symbolic/SymbolicSPN";
import { OctavePitch } from "pitches/OctavePitch";
import { Chord } from "../Chord";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AbsoluteChord<
P extends OctavePitch,
S extends SymbolicSPN<P>,
> extends Chord<S> {
}
