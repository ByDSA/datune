import * as chromaticChords from './chords/ChromaticChordInitializer';
import * as diatonicAltChords from './chords/DiatonicAltChordInitializer';
import * as chromatics from './degrees/ChromaticInitializer';
import * as diatonicAlts from './degrees/DiatonicAltInitializer';
import * as diatonics from './degrees/DiatonicInitializer';
import * as intervalDiatonicAlts from './intervals/IntervalDiatonicAltInitializer';
import * as intervalDiatonics from './intervals/IntervalDiatonicInitializer';
import * as qualities from './intervals/QualityInitializer';
import * as midiPitches from './midi/MidiPitchInitializer';
import * as chromaticPatterns from './patterns/ChromaticPatternInitializer';
import * as diatonicAltPatterns from './patterns/DiatonicAltPatternInitializer';
import * as diatonicPatterns from './patterns/DiatonicPatternInitializer';
import * as spns from './pitches/symbolic/SPNInitializer';
import * as diatonicAltDegrees from './scales/degrees/DiatonicAltDegreeInitializer';
import * as diatonicDegrees from './scales/degrees/DiatonicDegreeInitializer';
import * as scaleChromatics from './scales/ScaleChromaticInitializer';
import * as scales from './scales/ScaleInitializer';
import * as scalePitches from './scales/ScalePitchInitializer';
import * as sourceScales from './scales/SourceScaleInitializer';
import * as settings from './settings/SettingsInitializer';
import * as bpms from './tempo/BPMInitializer';
import * as musicalDurations from './tempo/MusicalDurationInitializer';
import * as degreeFunctions from './tonalities/functions/DegreeFunctionInitializer';
import * as tonalities from './tonalities/TonalityInitializer';
import * as concertPitches from './tuning/ConcertPitchInitializer';
import * as intervalPitches from './tuning/IntervalPitchInitializer';
import * as temperaments from './tuning/TemperamentInitializer';
import * as tunings from './tuning/TuningInitializer';

export {
    chromaticChords,
    diatonicAltChords,
    chromatics,
    diatonicAlts,
    diatonics,
    intervalDiatonicAlts,
    intervalDiatonics,
    qualities,
    chromaticPatterns,
    diatonicAltPatterns,
    diatonicPatterns,
    diatonicAltDegrees,
    diatonicDegrees,
    scaleChromatics,
    scales,
    scalePitches,
    sourceScales,
    bpms,
    musicalDurations,
    degreeFunctions,
    tonalities,
    concertPitches,
    intervalPitches,
    temperaments,
    tunings,
    spns,
    midiPitches,
    settings
};

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