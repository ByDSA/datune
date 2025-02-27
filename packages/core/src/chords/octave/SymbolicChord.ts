import { Chord } from "../Chord";
import OctavePitch from "pitches/OctavePitch";

export default interface SymbolicChord<
P extends OctavePitch> extends Chord<P> {
}
