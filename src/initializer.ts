import * as chromaticChords from './chords/ChromaticChordInitializer';
import * as diatonicAltChords from './chords/DiatonicAltChordInitializer';
import * as chromatics from './degrees/ChromaticInitializer';
import * as diatonicAlts from './degrees/DiatonicAltInitializer';
import * as diatonics from './degrees/DiatonicInitializer';
import * as intervalDiatonicAlts from './intervals/IntervalDiatonicAltInitializer';
import * as intervalDiatonics from './intervals/IntervalDiatonicInitializer';
import * as qualities from './intervals/QualityInitializer';
import * as chromaticPatterns from './patterns/ChromaticPatternInitializer';
import * as diatonicAltPatterns from './patterns/DiatonicAltPatternInitializer';
import * as diatonicPatterns from './patterns/DiatonicPatternInitializer';
import * as diatonicAltDegrees from './scales/degrees/DiatonicAltDegreeInitializer';
import * as diatonicDegrees from './scales/degrees/DiatonicDegreeInitializer';
import * as scaleChromatics from './scales/ScaleChromaticInitializer';
import * as scales from './scales/ScaleInitializer';
import * as sourceScales from './scales/SourceScaleInitializer';
import * as bpms from './tempo/BPMInitializer';
import * as musicalDurations from './tempo/MusicalDurationInitializer';
import * as degreeFunctions from './tonalities/functions/DegreeFunctionInitializer';
import * as tonalities from './tonalities/TonalityInitializer';
import * as concertPitches from './tuning/ConcertPitchInitializer';
import * as intervalPitches from './tuning/IntervalPitchInitializer';
import * as temperaments from './tuning/TemperamentInitializer';
import * as tunings from './tuning/TuningInitializer';
import * as spns from './pitches/symbolic/SPNInitializer';
import * as midiPitches from './midi/MidiPitchInitializer';
import * as settings from './settings/SettingsInitializer';

export * as chromaticChords from './chords/ChromaticChordInitializer';
export * as diatonicAltChords from './chords/DiatonicAltChordInitializer';
export * as chromatics from './degrees/ChromaticInitializer';
export * as diatonicAlts from './degrees/DiatonicAltInitializer';
export * as diatonics from './degrees/DiatonicInitializer';
export * as intervalDiatonicAlts from './intervals/IntervalDiatonicAltInitializer';
export * as intervalDiatonics from './intervals/IntervalDiatonicInitializer';
export * as qualities from './intervals/QualityInitializer';
export * as chromaticPatterns from './patterns/ChromaticPatternInitializer';
export * as diatonicAltPatterns from './patterns/DiatonicAltPatternInitializer';
export * as diatonicPatterns from './patterns/DiatonicPatternInitializer';
export * as diatonicAltDegrees from './scales/degrees/DiatonicAltDegreeInitializer';
export * as diatonicDegrees from './scales/degrees/DiatonicDegreeInitializer';
export * as scaleChromatics from './scales/ScaleChromaticInitializer';
export * as scales from './scales/ScaleInitializer';
export * as scalePitches from './scales/ScalePitchInitializer';
export * as sourceScales from './scales/SourceScaleInitializer';
export * as bpms from './tempo/BPMInitializer';
export * as musicalDurations from './tempo/MusicalDurationInitializer';
export * as degreeFunctions from './tonalities/functions/DegreeFunctionInitializer';
export * as tonalities from './tonalities/TonalityInitializer';
export * as concertPitches from './tuning/ConcertPitchInitializer';
export * as intervalPitches from './tuning/IntervalPitchInitializer';
export * as temperaments from './tuning/TemperamentInitializer';
export * as tunings from './tuning/TuningInitializer';
export * as spns from './pitches/symbolic/SPNInitializer';
export * as midiPitches from './midi/MidiPitchInitializer';
export * as settings from './settings/SettingsInitializer';

export function all() {
    diatonics.default();
    qualities.default();
    intervalDiatonics.default();
    diatonicPatterns.default();

    chromatics.default();
    chromaticPatterns.default();
    chromaticChords.default();

    diatonicAlts.default();
    diatonicDegrees.default();
    diatonicAltDegrees.default();
    intervalDiatonicAlts.default();
    diatonicAltPatterns.default();
    diatonicAltChords.default();

    scales.default();
    scaleChromatics.default();
    sourceScales.default();

    tonalities.default();

    degreeFunctions.default();

    spns.default();
    concertPitches.default();
    temperaments.default();
    tunings.default();
    intervalPitches.default();

    midiPitches.default();

    musicalDurations.default();
    bpms.default();

    settings.default();
}