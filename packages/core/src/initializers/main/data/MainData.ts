import { ChromaticChordData } from "../../../initializers/chromaticchord/data/ChromaticChordData";
import { ScaleData } from "../../../initializers/scale/data/ScaleData";
import { TonalityData } from "../../../initializers/tonality/data/TonalityData";

export interface MainData {
    meta: MetaMainData,
    chords: ChromaticChordData | null;
    keys: TonalityData | null;
    scales: ScaleData | null;
}

export type MetaMainData = { version: string };