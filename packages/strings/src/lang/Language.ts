import { DiatonicsPart, QualitiesPart, ScalesPart, TemperamentsPart, IntervalSetsPart, WordsPart } from "./generation/parts";

export type Language = {
    id: string;
    name: string;
    diatonic: DiatonicsPart;
    scales: ScalesPart;
    intervalSets: IntervalSetsPart;
    shortIntervalSets: IntervalSetsPart;
    temperaments: TemperamentsPart;
    words: WordsPart;
    quality: QualitiesPart;
};
