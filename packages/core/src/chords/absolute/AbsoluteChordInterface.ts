import OctavePitch from "pitches/OctavePitch";
import { SPN } from "spns";
import Chord from "../Chord";

export default interface AbsoluteChord<
P extends OctavePitch,
S extends SPN<P>,
> extends Chord<S> {
}
