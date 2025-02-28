import { Chord } from "../Chord";
import { OctavePitch } from "pitches/OctavePitch";
import { SPN } from "spns";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface AbsoluteChord<
P extends OctavePitch,
S extends SPN<P>,
> extends Chord<S> {
}
