import { ChromaticChord } from '../chords/chromatic/ChromaticChord';
import { ChromaticPattern } from '../patterns/ChromaticPattern';
import { DiatonicAltChord } from '../chords/diatonicalt/DiatonicAltChord';
import { Chromatic } from '../degrees/Chromatic';
import { DiatonicAlt } from '../degrees/DiatonicAlt';
import { Language } from '../lang/Language';
import { Scale } from '../tonality/Scale';
import { Tonality } from '../tonality/Tonality';
import { ConcertPitch } from '../tuning/ConcertPitch';
import { Temperament } from '../tuning/Temperament';
import { Tuning } from '../tuning/Tuning';
import { Settings } from './Settings';
import { SettingsInterface } from './SettingsInterface';

export const DefaultSettings: SettingsInterface = {
    default: {
        get chromatic(): Chromatic { return Chromatic.C },
        get diatonicAlt(): DiatonicAlt { return DiatonicAlt.C },
        get scale(): Scale { return Scale.MAJOR },
        get tonality(): Tonality { return Tonality.C },
        get chromaticChord(): ChromaticChord { return ChromaticChord.C },
        get diatonicAltChord(): DiatonicAltChord { return DiatonicAltChord.C },
        get pattern(): ChromaticPattern { return ChromaticPattern.TRIAD_MAJOR },
        get temperament(): Temperament { return Temperament.ET12 },
        get tuning(): Tuning { return Tuning.EQUAL_440 },
        get concertPitch(): ConcertPitch { return ConcertPitch.A440 },
    },
    get lang() { return Language.ENG },
    scales: {
        get MAJOR(): string { return Settings.lang.scales.MAJOR },
        get MINOR(): string { return Settings.lang.scales.MINOR },
        get DORIAN(): string { return Settings.lang.scales.DORIAN },
        get PHRYGIAN(): string { return Settings.lang.scales.PHRYGIAN },
        get LYDIAN(): string { return Settings.lang.scales.LYDIAN },
        get MIXOLYDIAN(): string { return Settings.lang.scales.MIXOLYDIAN },
        get LOCRIAN(): string { return Settings.lang.scales.LOCRIAN },
        get HARMONIC_MINOR(): string { return Settings.lang.scales.HARMONIC_MINOR },
        get LOCRIAN_a6(): string { return Settings.lang.scales.LOCRIAN_a6 },
        get IONIAN_a5(): string { return Settings.lang.scales.IONIAN_a5 },
        get DORIAN_a4(): string { return Settings.lang.scales.DORIAN_a4 },
        get MIXOLYDIAN_b9_b13(): string { return Settings.lang.scales.MIXOLYDIAN_b9_b13 },
        get LYDIAN_a2(): string { return Settings.lang.scales.LYDIAN_a2 },
        get SUPERLOCRIAN_bb7(): string { return Settings.lang.scales.SUPERLOCRIAN_bb7 },
        get HARMONIC_MAJOR(): string { return Settings.lang.scales.HARMONIC_MAJOR },
        get DORIAN_b5(): string { return Settings.lang.scales.DORIAN_b5 },
        get PHRYGIAN_b4(): string { return Settings.lang.scales.PHRYGIAN_b4 },
        get LYDIAN_b3(): string { return Settings.lang.scales.LYDIAN_b3 },
        get MIXOLYDIAN_b2(): string { return Settings.lang.scales.MIXOLYDIAN_b2 },
        get AEOLIAN_b1(): string { return Settings.lang.scales.AEOLIAN_b1 },
        get LOCRIAN_bb7(): string { return Settings.lang.scales.LOCRIAN_bb7 },
        get MELODIC_MINOR(): string { return Settings.lang.scales.MELODIC_MINOR },
        get DORIAN_b2(): string { return Settings.lang.scales.DORIAN_b2 },
        get LYDIAN_a5(): string { return Settings.lang.scales.LYDIAN_a5 },
        get LYDIAN_b7(): string { return Settings.lang.scales.LYDIAN_b7 },
        get MIXOLYDIAN_b13(): string { return Settings.lang.scales.MIXOLYDIAN_b13 },
        get LOCRIAN_a2(): string { return Settings.lang.scales.LOCRIAN_a2 },
        get SUPERLOCRIAN(): string { return Settings.lang.scales.SUPERLOCRIAN },
        get DOUBLE_HARMONIC(): string { return Settings.lang.scales.DOUBLE_HARMONIC },
        get LYDIAN_a2_a6(): string { return Settings.lang.scales.LYDIAN_a2_a6 },
        get ULTRAPHRYGIAN(): string { return Settings.lang.scales.ULTRAPHRYGIAN },
        get HUNGARIAN_MINOR(): string { return Settings.lang.scales.HUNGARIAN_MINOR },
        get ORIENTAL(): string { return Settings.lang.scales.ORIENTAL },
        get IONIAN_AUGMENTED_a2(): string { return Settings.lang.scales.IONIAN_AUGMENTED_a2 },
        get LOCRIAN_bb3_bb7(): string { return Settings.lang.scales.LOCRIAN_bb3_bb7 },
        get NEAPOLITAN_MINOR(): string { return Settings.lang.scales.NEAPOLITAN_MINOR },
        get NEAPOLITAN_MAJOR(): string { return Settings.lang.scales.NEAPOLITAN_MAJOR },
        get BLUES_b5(): string { return Settings.lang.scales.BLUES_b5 },
        get BLUES_a4(): string { return Settings.lang.scales.BLUES_a4 },
        get WHOLE_TONE(): string { return Settings.lang.scales.WHOLE_TONE },
        get PENTATONIC_MINOR(): string { return Settings.lang.scales.PENTATONIC_MINOR },
        get PENTATONIC(): string { return Settings.lang.scales.PENTATONIC },
        get EGYPCIAN(): string { return Settings.lang.scales.EGYPCIAN },
        get BLUES_MINOR(): string { return Settings.lang.scales.BLUES_MINOR },
        get BLUES_MAJOR(): string { return Settings.lang.scales.BLUES_MAJOR },
        get CHROMATIC(): string { return Settings.lang.scales.CHROMATIC },
        get AUGMENTED_TRIAD(): string { return Settings.lang.scales.AUGMENTED_TRIAD },
        get DIMINISHED_7th(): string { return Settings.lang.scales.DIMINISHED_7th },
        get MESSIAEN_V_TRUNCATED(): string { return Settings.lang.scales.MESSIAEN_V_TRUNCATED },
        get DOM7b5(): string { return Settings.lang.scales.DOM7b5 },
        get MESSIAEN_INV_III_V_TRUNCATED_n2(): string { return Settings.lang.scales.MESSIAEN_INV_III_V_TRUNCATED_n2 },
        get HALF_DIMINISHED(): string { return Settings.lang.scales.HALF_DIMINISHED },
        get MESSIAEN_V(): string { return Settings.lang.scales.MESSIAEN_V },
        get RAGA_INDRUPRIYA_INDIA(): string { return Settings.lang.scales.RAGA_INDRUPRIYA_INDIA },
        get MESSIAEN_II_TRUNCATED_n3(): string { return Settings.lang.scales.MESSIAEN_II_TRUNCATED_n3 },
        get MESSIAEN_III_INV(): string { return Settings.lang.scales.MESSIAEN_III_INV },
        get MESSIAEN_IV(): string { return Settings.lang.scales.MESSIAEN_IV },
        get MESSIAEN_VI(): string { return Settings.lang.scales.MESSIAEN_VI },
        get MESSIAEN_VII(): string { return Settings.lang.scales.MESSIAEN_VII },
        get BEBOP_MAJOR(): string { return Settings.lang.scales.BEBOP_MAJOR },
    },
    symbols: {
        sharp: "♯",
        bemol: "♭",
        alts: function (n: number): string {
            if (n < 0)
                return Settings.symbols.bemol.repeat(-n);
            else if (n > 0)
                return Settings.symbols.sharp.repeat(n);
            else
                return "";
        }
    },
    mods: {
        get b9(): string { return Settings.symbols.alts(-1) + "9"; },
        get a9(): string { return Settings.symbols.alts(1) + "9"; },
        get b5(): string { return Settings.symbols.alts(-1) + "5"; },
        get a5(): string { return Settings.symbols.alts(1) + "5"; },
        get a11(): string { return Settings.symbols.alts(1) + "11"; },
        get add(): string { return "ADD"; }
    },
    patterns: {
        get TRIAD_MAJOR(): string { return Settings.lang.patterns.TRIAD_MAJOR },
        get TRIAD_MINOR(): string { return Settings.lang.patterns.TRIAD_MINOR },
        get TRIAD_AUGMENTED(): string { return Settings.lang.patterns.TRIAD_AUGMENTED },
        get TRIAD_DIMINISHED(): string { return Settings.lang.patterns.TRIAD_DIMINISHED },
        get TRIAD_SUS4(): string { return Settings.lang.patterns.TRIAD_SUS4 },
        get TRIAD_QUARTAL(): string { return Settings.lang.patterns.TRIAD_QUARTAL },
        get ELEVENTH(): string { return Settings.lang.patterns.ELEVENTH },
        get ELEVENTH_MAJ11(): string { return Settings.lang.patterns.ELEVENTH_MAJ11 },
        get ELEVENTH_MINOR_MAJ11(): string { return Settings.lang.patterns.ELEVENTH_MINOR_MAJ11 },
        get ELEVENTH_a9(): string { return Settings.lang.patterns.ELEVENTH_a9 },
        get ELEVENTH_b9(): string { return Settings.lang.patterns.ELEVENTH_b9 },
        get NINTH(): string { return Settings.lang.patterns.NINTH },
        get NINTH_ADD6(): string { return Settings.lang.patterns.NINTH_ADD6 },
        get NINTH_MAJ9(): string { return Settings.lang.patterns.NINTH_MAJ9 },
        get NINTH_MAJ9_a11(): string { return Settings.lang.patterns.NINTH_MAJ9_a11 },
        get NINTH_MINOR(): string { return Settings.lang.patterns.NINTH_MINOR },
        get NINTH_MINOR_MAJ9(): string { return Settings.lang.patterns.NINTH_MINOR_MAJ9 },
        get NINTH_SUS4(): string { return Settings.lang.patterns.NINTH_SUS4 },
        get NINTH_a11(): string { return Settings.lang.patterns.NINTH_a11 },
        get NINTH_a5(): string { return Settings.lang.patterns.NINTH_a5 },
        get NINTH_b5(): string { return Settings.lang.patterns.NINTH_b5 },
        get POWER_CHORD(): string { return Settings.lang.patterns.POWER_CHORD },
        get SEVENTH(): string { return Settings.lang.patterns.SEVENTH },
        get SEVENTH_ADD11(): string { return Settings.lang.patterns.SEVENTH_ADD11 },
        get SEVENTH_ADD13(): string { return Settings.lang.patterns.SEVENTH_ADD13 },
        get SEVENTH_MAJ7(): string { return Settings.lang.patterns.SEVENTH_MAJ7 },
        get SEVENTH_MINOR(): string { return Settings.lang.patterns.SEVENTH_MINOR },
        get SEVENTH_MINOR_MAJ7(): string { return Settings.lang.patterns.SEVENTH_MINOR_MAJ7 },
        get SEVENTH_MINOR_a5(): string { return Settings.lang.patterns.SEVENTH_MINOR_a5 },
        get SEVENTH_MINOR_b5(): string { return Settings.lang.patterns.SEVENTH_MINOR_b5 },
        get SEVENTH_MINOR_b9(): string { return Settings.lang.patterns.SEVENTH_MINOR_b9 },
        get SEVENTH_SUS4(): string { return Settings.lang.patterns.SEVENTH_SUS4 },
        get SEVENTH_a5(): string { return Settings.lang.patterns.SEVENTH_a5 },
        get SEVENTH_a9(): string { return Settings.lang.patterns.SEVENTH_a9 },
        get SEVENTH_b5(): string { return Settings.lang.patterns.SEVENTH_b5 },
        get SEVENTH_b9(): string { return Settings.lang.patterns.SEVENTH_b9 },
        get SIXTH(): string { return Settings.lang.patterns.SIXTH },
        get SIXTH_ADD9(): string { return Settings.lang.patterns.SIXTH_ADD9 },
        get SIXTH_MINOR(): string { return Settings.lang.patterns.SIXTH_MINOR },
        get SIXTH_MINOR_ADD9(): string { return Settings.lang.patterns.SIXTH_MINOR_ADD9 },
        get SIXTH_SUS4(): string { return Settings.lang.patterns.SIXTH_SUS4 },
        get THIRTEENTH_MAJ13(): string { return Settings.lang.patterns.THIRTEENTH_MAJ13 },
        get THIRTEENTH_MAJ13_a5(): string { return Settings.lang.patterns.THIRTEENTH_MAJ13_a5 },
        get THIRTEENTH_MAJ13_a5a9(): string { return Settings.lang.patterns.THIRTEENTH_MAJ13_a5a9 },
        get THIRTEENTH_b5a9(): string { return Settings.lang.patterns.THIRTEENTH_b5a9 }
    },
    shortPatterns: {
        get TRIAD_MAJOR(): string { return Settings.lang.shortPatterns.TRIAD_MAJOR },
        get TRIAD_MINOR(): string { return Settings.lang.shortPatterns.TRIAD_MINOR },
        get TRIAD_AUGMENTED(): string { return Settings.lang.shortPatterns.TRIAD_AUGMENTED },
        get TRIAD_DIMINISHED(): string { return Settings.lang.shortPatterns.TRIAD_DIMINISHED },
        get TRIAD_SUS4(): string { return Settings.lang.shortPatterns.TRIAD_SUS4 },
        get TRIAD_QUARTAL(): string { return Settings.lang.shortPatterns.TRIAD_QUARTAL },
        get ELEVENTH(): string { return Settings.lang.shortPatterns.ELEVENTH },
        get ELEVENTH_MAJ11(): string { return Settings.lang.shortPatterns.ELEVENTH_MAJ11 },
        get ELEVENTH_MINOR_MAJ11(): string { return Settings.lang.shortPatterns.ELEVENTH_MINOR_MAJ11 },
        get ELEVENTH_a9(): string { return Settings.lang.shortPatterns.ELEVENTH_a9 },
        get ELEVENTH_b9(): string { return Settings.lang.shortPatterns.ELEVENTH_b9 },
        get NINTH(): string { return Settings.lang.shortPatterns.NINTH },
        get NINTH_ADD6(): string { return Settings.lang.shortPatterns.NINTH_ADD6 },
        get NINTH_MAJ9(): string { return Settings.lang.shortPatterns.NINTH_MAJ9 },
        get NINTH_MAJ9_a11(): string { return Settings.lang.shortPatterns.NINTH_MAJ9_a11 },
        get NINTH_MINOR(): string { return Settings.lang.shortPatterns.NINTH_MINOR },
        get NINTH_MINOR_MAJ9(): string { return Settings.lang.shortPatterns.NINTH_MINOR_MAJ9 },
        get NINTH_SUS4(): string { return Settings.lang.shortPatterns.NINTH_SUS4 },
        get NINTH_a11(): string { return Settings.lang.shortPatterns.NINTH_a11 },
        get NINTH_a5(): string { return Settings.lang.shortPatterns.NINTH_a5 },
        get NINTH_b5(): string { return Settings.lang.shortPatterns.NINTH_b5 },
        get POWER_CHORD(): string { return Settings.lang.shortPatterns.POWER_CHORD },
        get SEVENTH(): string { return Settings.lang.shortPatterns.SEVENTH },
        get SEVENTH_ADD11(): string { return Settings.lang.shortPatterns.SEVENTH_ADD11 },
        get SEVENTH_ADD13(): string { return Settings.lang.shortPatterns.SEVENTH_ADD13 },
        get SEVENTH_MAJ7(): string { return Settings.lang.shortPatterns.SEVENTH_MAJ7 },
        get SEVENTH_MINOR(): string { return Settings.lang.shortPatterns.SEVENTH_MINOR },
        get SEVENTH_MINOR_MAJ7(): string { return Settings.lang.shortPatterns.SEVENTH_MINOR_MAJ7 },
        get SEVENTH_MINOR_a5(): string { return Settings.lang.shortPatterns.SEVENTH_MINOR_a5 },
        get SEVENTH_MINOR_b5(): string { return Settings.lang.shortPatterns.SEVENTH_MINOR_b5 },
        get SEVENTH_MINOR_b9(): string { return Settings.lang.shortPatterns.SEVENTH_MINOR_b9 },
        get SEVENTH_SUS4(): string { return Settings.lang.shortPatterns.SEVENTH_SUS4 },
        get SEVENTH_a5(): string { return Settings.lang.shortPatterns.SEVENTH_a5 },
        get SEVENTH_a9(): string { return Settings.lang.shortPatterns.SEVENTH_a9 },
        get SEVENTH_b5(): string { return Settings.lang.shortPatterns.SEVENTH_b5 },
        get SEVENTH_b9(): string { return Settings.lang.shortPatterns.SEVENTH_b9 },
        get SIXTH(): string { return Settings.lang.shortPatterns.SIXTH },
        get SIXTH_ADD9(): string { return Settings.lang.shortPatterns.SIXTH_ADD9 },
        get SIXTH_MINOR(): string { return Settings.lang.shortPatterns.SIXTH_MINOR },
        get SIXTH_MINOR_ADD9(): string { return Settings.lang.shortPatterns.SIXTH_MINOR_ADD9 },
        get SIXTH_SUS4(): string { return Settings.lang.shortPatterns.SIXTH_SUS4 },
        get THIRTEENTH_MAJ13(): string { return Settings.lang.shortPatterns.THIRTEENTH_MAJ13 },
        get THIRTEENTH_MAJ13_a5(): string { return Settings.lang.shortPatterns.THIRTEENTH_MAJ13_a5 },
        get THIRTEENTH_MAJ13_a5a9(): string { return Settings.lang.shortPatterns.THIRTEENTH_MAJ13_a5a9 },
        get THIRTEENTH_b5a9(): string { return Settings.lang.shortPatterns.THIRTEENTH_b5a9 },
    }
}