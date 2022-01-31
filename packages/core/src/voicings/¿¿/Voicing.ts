import OctavePitch from "pitches/OctavePitch";
import RelativePitch from "./RelativePitch";

type Voicing<D extends OctavePitch> = RelativePitch<D>[];
export default Voicing;
