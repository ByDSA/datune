import { OctavePitch } from "pitches/OctavePitch";
import { Chord } from "../Chord";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SymbolicChord<
P extends OctavePitch> extends Chord<P> {
}
