import { ChromaticChord } from './chords/chromatic/ChromaticChord';
import { DiatonicAltChord } from './chords/diatonicalt/DiatonicAltChord';
import { Chromatic } from './degrees/Chromatic';
import { DiatonicAltDegree } from './degrees/degrees/DiatonicAltDegree';
import { DiatonicDegree } from './degrees/degrees/DiatonicDegree';
import { Diatonic } from './degrees/Diatonic';
import { DiatonicAlt } from './degrees/DiatonicAlt';
import { DegreeFunction } from './function/DegreeFunction';
import { IntervalDiatonic } from './interval/IntervalDiatonic';
import { IntervalDiatonicAlt } from './interval/IntervalDiatonicAlt';
import { Quality } from './interval/Quality';
import { MidiPitch } from './midi/MidiPitch';
import { ChromaticPattern } from './patterns/ChromaticPattern';
import { DiatonicAltPattern } from './patterns/DiatonicAltPattern';
import { DiatonicPattern } from './patterns/DiatonicPattern';
import { SPN } from './pitch/symbolic/SPN';
import { DefaultSettings } from './settings/DefaultSettings';
import { Settings } from './settings/Settings';
import { BPM } from './tempo/BPM';
import { MusicalDuration } from './tempo/MusicalDuration';
import { Scale } from './tonality/Scale';
import { ScaleChromatic } from './tonality/ScaleChromatic';
import { ScalePitch } from './tonality/ScalePitch';
import { SourceScaleUtils } from './tonality/SourceScaleUtils';
import { Tonality } from './tonality/Tonality';
import { ConcertPitch } from './tuning/ConcertPitch';
import { IntervalPitch } from './tuning/IntervalPitch';
import { Temperament } from './tuning/Temperament';
import { Tuning } from './tuning/Tuning';

// DIATONICS
export function diatonics() {
    if (Diatonic.C)
        return;

    (<any>Diatonic).initialize();
}

// DIATONIC ALTS
export function diatonicAlts() {
    if (DiatonicAlt.C)
        return;

    diatonics();

    (<any>DiatonicAlt).initialize();
}

// DIATONIC ALTS
export function diatonicAltChords() {
    if (DiatonicAltChord.C)
        return;

    diatonicAlts();

    chromatics();

    diatonicAltPatterns();

    (<any>DiatonicAltChord).initialize();
}


// INTERVAL DIATONIC ALTS
export function intervalDiatonicAlts() {
    if (IntervalDiatonicAlt.PERFECT_UNISON)
        return;

    qualities();
    intervalDiatonics();

    (<any>IntervalDiatonicAlt).initialize();
}

// CHROMATICS
export function chromatics() {
    if (Chromatic.C)
        return;

    diatonicAlts(); // For naming

    (<any>Chromatic).initialize();
}

// DIATONIC PATTERNS
export function diatonicPatterns() {
    intervalDiatonics();

    (<any>DiatonicPattern).initialize();
}

// DIATONIC ALT PATTERNS
export function diatonicAltPatterns() {
    if (DiatonicAltPattern.TRIAD_MAJOR)
        return;

    intervalDiatonicAlts();

    diatonicPatterns();

    chromaticPatterns();

    intervalDiatonics();

    (<any>DiatonicAltPattern).initialize();
}

// CHROMATIC PATTERNS
export function chromaticPatterns() {
    if (ChromaticPattern.TRIAD_MAJOR)
        return;
    (<any>ChromaticPattern).initialize();
}

// CHROMATIC CHORDS
export function chromaticChords() {
    if (ChromaticChord.C)
        return;

    chromatics();

    (<any>ChromaticChord).initialize();
}

// SCALES
export function scales() {
    if (Scale.MAJOR)
        return;

    diatonicAltDegrees();
    intervalDiatonicAlts();
    chromatics();
    scaleChromatics();

    (<any>Scale).initialize();
};

// SCALE CHROMATICS
export function scaleChromatics() {
    if (ScaleChromatic.MAJOR)
        return;

    (<any>ScaleChromatic).initialize();
};

// SCALE PITCHES
export function scalePitches() {
    if (ScalePitch.MAJOR_ET12)
        return;

    intervalPitches();

    (<any>ScalePitch).initialize();
};

// SOURCE SCALES
export function sourceScales() {
    if ((<any>SourceScaleUtils)._sourceScales)
        return;

    (<any>SourceScaleUtils)._sourceScales = [
        Scale.MAJOR,
        Scale.HARMONIC_MINOR,
        Scale.MELODIC_MINOR,
        Scale.HARMONIC_MAJOR,
        Scale.DOUBLE_HARMONIC,
        Scale.PENTATONIC
    ];

    // Static initialization
    (<any>SourceScaleUtils).sourceScaleMapInitialize();

};

// TONALITIES
export function tonalities() {
    if (Tonality.C)
        return;

    scales();
    diatonicAlts();
    chromatics();
    intervalDiatonicAlts();
    diatonicAltPatterns();

    Tonality.C = Tonality.from(DiatonicAlt.C, Scale.MAJOR);
    Tonality.CC = Tonality.from(DiatonicAlt.CC, Scale.MAJOR);
    Tonality.D = Tonality.from(DiatonicAlt.D, Scale.MAJOR);
    Tonality.DD = Tonality.from(DiatonicAlt.DD, Scale.MAJOR);
    Tonality.E = Tonality.from(DiatonicAlt.E, Scale.MAJOR);
    Tonality.F = Tonality.from(DiatonicAlt.F, Scale.MAJOR);
    Tonality.FF = Tonality.from(DiatonicAlt.FF, Scale.MAJOR);
    Tonality.G = Tonality.from(DiatonicAlt.G, Scale.MAJOR);
    Tonality.GG = Tonality.from(DiatonicAlt.GG, Scale.MAJOR);
    Tonality.A = Tonality.from(DiatonicAlt.A, Scale.MAJOR);
    Tonality.B = Tonality.from(DiatonicAlt.B, Scale.MAJOR);

    Tonality.Cm = Tonality.from(DiatonicAlt.C, Scale.MINOR);
    Tonality.CCm = Tonality.from(DiatonicAlt.CC, Scale.MINOR);
    Tonality.Dm = Tonality.from(DiatonicAlt.D, Scale.MINOR);
    Tonality.DDm = Tonality.from(DiatonicAlt.DD, Scale.MINOR);
    Tonality.Em = Tonality.from(DiatonicAlt.E, Scale.MINOR);
    Tonality.Fm = Tonality.from(DiatonicAlt.F, Scale.MINOR);
    Tonality.FFm = Tonality.from(DiatonicAlt.FF, Scale.MINOR);
    Tonality.Gm = Tonality.from(DiatonicAlt.G, Scale.MINOR);
    Tonality.GGm = Tonality.from(DiatonicAlt.GG, Scale.MINOR);
    Tonality.Am = Tonality.from(DiatonicAlt.A, Scale.MINOR);
    Tonality.Bm = Tonality.from(DiatonicAlt.B, Scale.MINOR);
};

// Settings
export function settings() {
    Object.assign(Settings, DefaultSettings)
}

// DEGREE FUNCTIONS
export function degreeFunctions() {
    if (DegreeFunction.I)
        return;
    (<any>DegreeFunction).initialize();
}

// DEGREE FUNCTIONS
export function diatonicDegrees() {
    if (DiatonicDegree.I)
        return;
    (<any>DiatonicDegree).initialize();
}

// DIATONIC ALT DEGREES
export function diatonicAltDegrees() {
    diatonicDegrees();
    diatonics();

    (<any>DiatonicAltDegree).initialize();
}

// TEMPERAMENTS
export function temperaments() {
    if (Temperament.ET12)
        return;

    intervalPitches();

    intervalDiatonicAlts();

    (<any>Temperament).initialize();
}

// CHROMATIC SYMBOLIC PITCHES
export function spns() {
    if (SPN.A4)
        return;

    chromatics();

    (<any>SPN).initialize();
}

// INTERVAL DIATONIC
export function intervalDiatonics() {
    if (IntervalDiatonic.UNISON)
        return;

    diatonics();

    (<any>IntervalDiatonic).initialize();
}

// CONCERT PITCHES
export function concertPitches() {
    if (ConcertPitch.A440)
        return;

    spns();

    (<any>ConcertPitch).initialize();
}

// TUNINGS
export function tunings() {
    if (Tuning.EQUAL_440)
        return;

    concertPitches();
    temperaments();

    (<any>Tuning).initialize();
}

// TUNINGS
export function intervalPitches() {
    if (IntervalPitch.UNISON)
        return;

    (<any>IntervalPitch).initialize();
}

// PITCH MIDI
export function midiPitches() {
    if (MidiPitch.C5)
        return;

    spns();
    intervalDiatonicAlts();
    diatonicAlts();
    tunings();

    (<any>MidiPitch).initialize();
}

// Musical Duration
export function musicalDurations() {
    if (MusicalDuration.QUARTER)
        return;

    (<any>MusicalDuration).initialize();
}

// BPM
export function bpms() {
    if (BPM.QUARTER_120)
        return;

    musicalDurations();

    (<any>BPM).initialize();
}

// Quality
export function qualities() {
    if (Quality.MAJOR)
        return;

    (<any>Quality).initialize();
}

export function all() {
    diatonics();
    qualities();
    intervalDiatonics();
    diatonicPatterns();

    chromatics();
    chromaticPatterns();
    chromaticChords();

    diatonicAlts();
    diatonicDegrees();
    diatonicAltDegrees();
    intervalDiatonicAlts();
    diatonicAltPatterns();
    diatonicAltChords();

    scales();
    scaleChromatics();
    sourceScales();

    tonalities();

    degreeFunctions();

    spns();
    concertPitches();
    temperaments();
    tunings();
    intervalPitches();

    midiPitches();

    musicalDurations();
    bpms();

    settings();
}