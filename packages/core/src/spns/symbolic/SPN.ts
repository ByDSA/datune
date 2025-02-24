import OctavePitch from "pitches/OctavePitch";

export default interface SPN<P extends OctavePitch> {
    pitch: P;
    octave: number;
}
