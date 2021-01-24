import { BPM, ConcertPitch, DegreeAlt, Diatonic, DiatonicDegree, IntervalDiatonic, IntervalPitch, MusicalDuration, PatternAlt, Scale, ScaleAlt, ScalePitch, Temperament, Tuning } from "index";
import { Chromatic, DiatonicAlt } from "../pitches";
import { TonalityAlt } from "../tonalities";
import { ChromaticPattern } from "../voicings/relative/chromatic/ChromaticPattern";

function diatonics() {
    Diatonic.all;
}

function notes() {
    Chromatic.all;
}

function intervalDiatonics() {
    IntervalDiatonic.UNISON;
    IntervalDiatonic.SECOND;
    IntervalDiatonic.THIRD;
    IntervalDiatonic.FOURTH;
    IntervalDiatonic.FIFTH;
    IntervalDiatonic.SIXTH;
    IntervalDiatonic.SEVENTH;
    IntervalDiatonic.OCTAVE;
    IntervalDiatonic.NINTH;
    IntervalDiatonic.TENTH;
    IntervalDiatonic.ELEVENTH;
    IntervalDiatonic.TWELFTH;
    IntervalDiatonic.THIRTEENTH;
    IntervalDiatonic.FOURTEENTH;
    IntervalDiatonic.FIFTEENTH;
}

function diatonicAlts() {
    DiatonicAlt.C;
    DiatonicAlt.CC;
    DiatonicAlt.D;
    DiatonicAlt.DD;
    DiatonicAlt.Eb;
    DiatonicAlt.E;
    DiatonicAlt.F;
    DiatonicAlt.FF;
    DiatonicAlt.Gb;
    DiatonicAlt.G;
    DiatonicAlt.GG;
    DiatonicAlt.Ab;
    DiatonicAlt.A;
    DiatonicAlt.AA;
    DiatonicAlt.Bb;
    DiatonicAlt.B;
}

function patterns() {
    ChromaticPattern.sets.all;
}

function qualities() {
    // TODO
}

function diatonicPatterns() {
    // TODO
}

function intervalAlts() {
    // TODO
}

function patternalts() {
    PatternAlt.all();
}

function diatonicDegrees() {
    DiatonicDegree.all();
}

function diatonicAltDegrees() {
    DegreeAlt.I;
    DegreeAlt.bII;
    DegreeAlt.II;
    DegreeAlt.bIII;
    DegreeAlt.III;
    DegreeAlt.IV;
    DegreeAlt.bV;
    DegreeAlt.V;
    DegreeAlt.bVI;
    DegreeAlt.VI;
    DegreeAlt.bVII;
    DegreeAlt.VII;
}

function Scales() {
    Scale.sets.all();
}

function scales() {
    ScaleAlt.sets.common();
}

function intervalPitches() {
    IntervalPitch.CENT;
    IntervalPitch.OCTAVE;
    IntervalPitch.UNISON;

    // TODO
}

function spns() {
    // TODO
}

function concertPitches() {
    ConcertPitch.A440;
    ConcertPitch.A432;
    ConcertPitch.A444;
}

function temperaments() {
    Temperament.ET12;
    Temperament.PYTHAGOREAN;
    Temperament.LIMIT_5_SYMMETRIC_N1;
    Temperament.LIMIT_5_SYMMETRIC_N2;
}

function tunings() {
    Tuning.EQUAL_440;
    Tuning.LIMIT_5_SYMMETRIC_N1_440;
}

function degreeFunctions() {
    // TODO
}

function musicalDurations() {
    MusicalDuration.ZERO;
    MusicalDuration.MAXIMA;
    MusicalDuration.LONGA;
    MusicalDuration.DOUBLE;
    MusicalDuration.WHOLE;
    MusicalDuration.HALF;
    MusicalDuration.QUARTER;
    MusicalDuration.EIGHTH;
    MusicalDuration.SIXTEENTH;
    MusicalDuration.THIRTYSECOND;
    MusicalDuration.SIXTYFOURTH;
}

function bpms() {
    BPM.QUARTER_120;
}

function scalePitches() {
    ScalePitch.MAJOR_ET12;
    ScalePitch.MAJOR_PYTHAGOREAN;
}

function sourceScales() {
    // TODO
}

function tonalities() {
    TonalityAlt.C;
    TonalityAlt.CC;
    TonalityAlt.D;
    TonalityAlt.DD;
    TonalityAlt.E;
    TonalityAlt.F;
    TonalityAlt.FF;
    TonalityAlt.G;
    TonalityAlt.GG;
    TonalityAlt.A;
    TonalityAlt.AA;
    TonalityAlt.B;
    TonalityAlt.Cm;
    TonalityAlt.CCm;
    TonalityAlt.Dm;
    TonalityAlt.DDm;
    TonalityAlt.Em;
    TonalityAlt.Fm;
    TonalityAlt.FFm;
    TonalityAlt.Gm;
    TonalityAlt.GGm;
    TonalityAlt.Am;
    TonalityAlt.AAm;
    TonalityAlt.Bm;
}

function chords() {
    // TODO
}

function chordAlts() {
    // TODO
}

export function all() {
    diatonics();
    qualities();
    intervalDiatonics();
    diatonicPatterns();

    notes();
    patterns();
    chords();

    diatonicAlts();
    diatonicDegrees();
    diatonicAltDegrees();
    intervalAlts();
    patternalts();
    chordAlts();

    scales();
    Scales();
    sourceScales();
    scalePitches();

    tonalities();

    degreeFunctions();

    spns();
    concertPitches();
    temperaments();
    tunings();
    intervalPitches();

    musicalDurations();
    bpms();
}