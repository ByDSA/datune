import { OctavePitch } from "pitches/OctavePitch";

export interface SPN<P extends OctavePitch> {
    pitch: P;
    octave: number;
}
