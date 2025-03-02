import { Chord } from "../Chord";
import { SymbolicSPN } from "spns/symbolic/SymbolicSPN";
import { OctavePitch } from "pitches/OctavePitch";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AbsoluteChord<
P extends OctavePitch,
S extends SymbolicSPN<P>,
> extends Chord<S> {
}
