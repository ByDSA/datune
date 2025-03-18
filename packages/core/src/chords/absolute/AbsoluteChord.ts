import { SymbolicSpn } from "spns/symbolic/SymbolicSpn";
import { OctavePitch } from "pitches/OctavePitch";
import { Chord } from "../Chord";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AbsoluteChord<
P extends OctavePitch,
S extends SymbolicSpn<P>,
> extends Chord<S> {
}
