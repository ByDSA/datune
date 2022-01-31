import OctavePitch from "pitches/OctavePitch";
import Chord from "../Chord";

export default interface SymbolicChord<
P extends OctavePitch> extends Chord<P> {
}
