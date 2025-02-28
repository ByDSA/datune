import type { RelativePitch } from "./RelativePitch";
import type { OctavePitch } from "pitches/OctavePitch";

export type Voicing<D extends OctavePitch> = RelativePitch<D>[];
