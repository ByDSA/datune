import { ChromaticChordData } from "../../chromaticchord/data/ChromaticChordData";
import { KeyData } from "../../key/data/KeyData";
import { ScaleData } from "../../scale/data/ScaleData";

export interface MainData {
    meta: MetaMainData;
    chords: ChromaticChordData | null;
    keys: KeyData | null;
    scales: ScaleData | null;
}

export type MetaMainData = { version: string };
