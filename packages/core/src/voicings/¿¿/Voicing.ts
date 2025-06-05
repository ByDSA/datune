import type { RelativePitch } from "./RelativePitch";
import type { OctavePitch } from "pitches/OctavePitch";

export type Voicing<I, D extends OctavePitch<I>> = RelativePitch<I, D>[];
