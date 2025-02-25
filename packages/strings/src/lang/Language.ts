import { DiatonicsPart, QualitiesPart, ScalesPart, TemperamentsPart, VoicingsPart, WordsPart } from "./generation/parts";

type Language = {
    id: string;
    name: string;
    diatonic: DiatonicsPart;
    scales: ScalesPart;
    voicings: VoicingsPart;
    shortVoicings: VoicingsPart;
    temperaments: TemperamentsPart;
    words: WordsPart;
    quality: QualitiesPart;
};

export default Language;
