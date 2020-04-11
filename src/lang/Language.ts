import { Settings } from '../settings/Settings';
import { LanguageInterface } from 'lang/LanguageInterface';

export class Language {
    private constructor() {
    }

    static ENG: LanguageInterface = {
        diatonic: {
            C: "C",
            D: "D",
            E: "E",
            F: "F",
            G: "G",
            A: "A",
            B: "B",
        },
        scales: {
            MAJOR: "MAJOR",
            MINOR: "MINOR",
            DORIAN: "DORIAN",
            PHRYGIAN: "PHRYGIAN",
            LYDIAN: "LYDIAN",
            MIXOLYDIAN: "MIXOLYDIAN",
            LOCRIAN: "LOCRIAN",

            HARMONIC_MINOR: "HARMONIC MINOR",
            get LOCRIAN_a6(): string {return  "LOCRIAN " + Settings.symbols.alts(1) + "6";},
            get IONIAN_a5(): string {return  "IONIAN " + Settings.symbols.alts(1) + "5";},
            get DORIAN_a4(): string {return  "DORIAN " + Settings.symbols.alts(1) + "4";},
            get MIXOLYDIAN_b9_b13(): string {return "MIXOLYDIAN " + Settings.symbols.alts(-1) + "9" + Settings.symbols.alts(-1) + "13";},
            get LYDIAN_a2(): string {return  "LYDIAN " + Settings.symbols.alts(1) + "2";},
            get SUPERLOCRIAN_bb7(): string {return  "SUPERLOCRIAN " + Settings.symbols.alts(-2) + "7";},

            HARMONIC_MAJOR: "HARMONIC MAJOR",
            get DORIAN_b5(): string {return  "DORIAN " + Settings.symbols.alts(-1) + "5";},
            get PHRYGIAN_b4(): string {return  "PHRYGIAN " + Settings.symbols.alts(-1) + "4";},
            get LYDIAN_b3(): string {return  "LYDIAN " + Settings.symbols.alts(-1) + "3";},
            get MIXOLYDIAN_b2(): string {return  "MIXOLYDIAN " + Settings.symbols.alts(-1) + "2";},
            get AEOLIAN_b1(): string {return  "LYDIAN AUGMENTED " + Settings.symbols.alts(1) + "2";},
            get LOCRIAN_bb7(): string {return  "LOCRIAN " + Settings.symbols.alts(-2) + "7";},

            MELODIC_MINOR: "MELODIC MINOR",
            get DORIAN_b2(): string {return  "DORIAN " + Settings.symbols.alts(-1) + "2";},
            get LYDIAN_a5(): string {return  "LYDIAN " + Settings.symbols.alts(1) + "5";},
            get LYDIAN_b7(): string {return  "LYDIAN " + Settings.symbols.alts(-1) + "7";},
            get MIXOLYDIAN_b13(): string {return  "MIXOLYDIAN " + Settings.symbols.alts(-1) + "13";},
            get LOCRIAN_a2(): string {return  "LOCRIAN " + Settings.symbols.alts(1) + "2";},
            SUPERLOCRIAN: "SUPERLOCRIAN",

            DOUBLE_HARMONIC: "DOUBLE HARMONIC",
            get LYDIAN_a2_a6(): string {return  "LYDIAN " + Settings.symbols.alts(1) + "2" + Settings.symbols.alts(1) + "6";},
            ULTRAPHRYGIAN: "ULTRAPHRYGIAN",
            HUNGARIAN_MINOR: "HUNGARIAN MINOR",
            ORIENTAL: "ORIENTAL",
            get IONIAN_AUGMENTED_a2(): string {return  "IONIAN AUGMENTED " + Settings.symbols.alts(1) + "2";},
            get LOCRIAN_bb3_bb7(): string {return  "LOCRIAN " + Settings.symbols.alts(-2) + "3" + Settings.symbols.alts(-2) + "7";},

            NEAPOLITAN_MINOR: "NEAPOLITAN MINOR",
            NEAPOLITAN_MAJOR: "NEAPOLITAN MAJOR",

            // 6
            get BLUES_b5(): string {return  "BLUES " + Settings.symbols.alts(-1) + "5";},
            get BLUES_a4(): string {return  "BLUES " + Settings.symbols.alts(1) + "4";},

            WHOLE_TONE: "WHOLE TONE",

            // 5
            PENTATONIC_MINOR: "PENTATONIC MINOR",
            PENTATONIC: "PENTATONIC",
            EGYPCIAN: "EGYPCIAN",
            BLUES_MINOR: "BLUES MINOR",
            BLUES_MAJOR: "BLUES MAJOR",

            // 12
            CHROMATIC: "CHROMATIC",

            AUGMENTED_TRIAD: "AUGMENTED TRIAD",
            DIMINISHED_7th: "DIMINISHED 7th",
            MESSIAEN_V_TRUNCATED: "MESSIAEN V TRUNCATED",
            get DOM7b5(): string {return  "DOM7" + Settings.symbols.alts(-1) + "5";},
            MESSIAEN_INV_III_V_TRUNCATED_n2: "MESSIAEN INV. III V TRUNCATED n2",
            HALF_DIMINISHED: "HALF DIMINISHED",
            MESSIAEN_V: "MESSIAEN V",
            RAGA_INDRUPRIYA_INDIA: "RAGA INDRUPRIYA INDIA",
            MESSIAEN_II_TRUNCATED_n3: "MESSIAEN II TRUNCATED n3",
            MESSIAEN_III_INV: "MESSIAEN III INV",
            MESSIAEN_IV: "MESSIAEN IV",
            MESSIAEN_VI: "MESSIAEN VI",
            MESSIAEN_VII: "MESSIAEN VII",

            BEBOP_MAJOR: "BEBOP MAJOR"
        },
        patterns: {
            TRIAD_MAJOR: "MAJOR",
            TRIAD_MINOR: "MINOR",
            TRIAD_AUGMENTED: "AUGMENTED",
            TRIAD_DIMINISHED: "DIMINISHED",
            TRIAD_SUS4: "SUS4",
            TRIAD_QUARTAL: "QUARTAL",
            ELEVENTH: "ELEVENTH",
            ELEVENTH_MAJ11: "ELEVENTH MAJ11",
            ELEVENTH_MINOR_MAJ11: "ELEVENTH MINOR MAJ11",
            get ELEVENTH_a9(): string {return  "ELEVENTH " + Settings.mods.a9;},
            get ELEVENTH_b9(): string {return  "ELEVENTH " + Settings.mods.b9;},
            NINTH: "NINTH",
            NINTH_ADD6: "NINTH ADD6",
            NINTH_MAJ9: "NINTH MAJ9",
            get NINTH_MAJ9_a11(): string {return  "NINTH MAJ9 " + Settings.mods.a11;},
            NINTH_MINOR: "NINTH_MINOR",
            NINTH_MINOR_MAJ9: "NINTH MINOR MAJ9",
            NINTH_SUS4: "NINTH SUS4",
            get NINTH_a11(): string {return  "NINTH " + Settings.mods.a11;},
            get NINTH_a5(): string {return  "NINTH " + Settings.mods.a5;},
            get NINTH_b5(): string {return  "NINTH " + Settings.mods.b5;},
            POWER_CHORD: "POWER CHORD",
            SEVENTH: "SEVENTH",
            SEVENTH_ADD11: "SEVENTH ADD11",
            SEVENTH_ADD13: "SEVENTH ADD13",
            SEVENTH_MAJ7: "SEVENTH MAJ7",
            SEVENTH_MINOR: "SEVENTH MINOR",
            SEVENTH_MINOR_MAJ7: "SEVENTH MINOR MAJ7",
            get SEVENTH_MINOR_a5(): string {return  "SEVENTH MINOR " + Settings.mods.a5;},
            get SEVENTH_MINOR_b5(): string {return  "SEVENTH MINOR " + Settings.mods.b5;},
            get SEVENTH_MINOR_b9(): string {return  "SEVENTH MINOR " + Settings.mods.b9;},
            SEVENTH_SUS4: "SEVENTH SUS4",
            get SEVENTH_a5(): string {return  "SEVENTH " + Settings.mods.a5;},
            get SEVENTH_a9(): string {return  "SEVENTH " + Settings.mods.a9;},
            get SEVENTH_b5(): string {return  "SEVENTH " + Settings.mods.b5;},
            get SEVENTH_b9(): string {return  "SEVENTH " + Settings.mods.b9;},
            SIXTH: "SIXTH",
            SIXTH_ADD9: "SIXTH ADD9",
            SIXTH_MINOR: "SIXTH MINOR",
            SIXTH_MINOR_ADD9: "SIXTH MINOR ADD9",
            SIXTH_SUS4: "SIXTH SUS4",
            THIRTEENTH_MAJ13: "THIRTEENTH MAJ13",
            get THIRTEENTH_MAJ13_a5(): string {return  "THIRTEENTH MAJ13 " + Settings.mods.a5;},
            get THIRTEENTH_MAJ13_a5a9(): string {return  "THIRTEENTH MAJ13 " + Settings.mods.a5 + Settings.mods.a9;}
        }
    }

    static ESP: LanguageInterface = {
        diatonic: {
            C: "Do",
            D: "Re",
            E: "Mi",
            F: "Fa",
            G: "Sol",
            A: "La",
            B: "Si",
        },
        scales: {
            MAJOR: "MAYOR",
            MINOR: "MENOR",
            DORIAN: "DÓRICA",
            PHRYGIAN: "FRIGIA",
            LYDIAN: "LIDIA",
            MIXOLYDIAN: "MIXOLIDIA",
            LOCRIAN: "LOCRIA",

            HARMONIC_MINOR: "HARMÓNICA MENOR",
            get LOCRIAN_a6(): string {return  "LOCRIA " + Settings.symbols.alts(1) + "6";},
            get IONIAN_a5(): string {return  "JÓNICA " + Settings.symbols.alts(1) + "5";},
            get DORIAN_a4(): string {return  "DÓRICA " + Settings.symbols.alts(1) + "4";},
            get MIXOLYDIAN_b9_b13(): string {return "MIXOLIDIA " + Settings.symbols.alts(-1) + "9" + Settings.symbols.alts(-1) + "13";},
            get LYDIAN_a2(): string {return  "LIDIA " + Settings.symbols.alts(1) + "2";},
            get SUPERLOCRIAN_bb7(): string {return  "SUPERLOCRIA " + Settings.symbols.alts(-2) + "7";},

            HARMONIC_MAJOR: "MAYOR HARMÓNICA",
            get DORIAN_b5(): string {return  "DÓRICA " + Settings.symbols.alts(-1) + "5";},
            get PHRYGIAN_b4(): string {return  "FRIGIA " + Settings.symbols.alts(-1) + "4";},
            get LYDIAN_b3(): string {return  "LIDIA " + Settings.symbols.alts(-1) + "3";},
            get MIXOLYDIAN_b2(): string {return  "MIXOLIDIA " + Settings.symbols.alts(-1) + "2";},
            get AEOLIAN_b1(): string {return  "LIDIA AUMENTADA " + Settings.symbols.alts(1) + "2";},
            get LOCRIAN_bb7(): string {return  "LOCRIA " + Settings.symbols.alts(-2) + "7";},

            MELODIC_MINOR: "MENOR MELÓDICA",
            get DORIAN_b2(): string {return  "DÓRICA " + Settings.symbols.alts(-1) + "2";},
            get LYDIAN_a5(): string {return  "LIDIA " + Settings.symbols.alts(1) + "5";},
            get LYDIAN_b7(): string {return  "LIDIA " + Settings.symbols.alts(-1) + "7";},
            get MIXOLYDIAN_b13(): string {return  "MIXOLIDIA " + Settings.symbols.alts(-1) + "13";},
            get LOCRIAN_a2(): string {return  "LOCRIA " + Settings.symbols.alts(1) + "2";},
            SUPERLOCRIAN: "SUPERLOCRIA",

            DOUBLE_HARMONIC: "DOBLE HARMÓNICA",
            get LYDIAN_a2_a6(): string {return  "LIDIA " + Settings.symbols.alts(1) + "2" + Settings.symbols.alts(1) + "6";},
            ULTRAPHRYGIAN: "ULTRAFRIGIA",
            HUNGARIAN_MINOR: "MENOR HÚNGARA",
            ORIENTAL: "ORIENTAL",
            get IONIAN_AUGMENTED_a2(): string {return  "JÓNICA AUMENTADA " + Settings.symbols.alts(1) + "2";},
            get LOCRIAN_bb3_bb7(): string {return  "LOCRIA " + Settings.symbols.alts(-2) + "3" + Settings.symbols.alts(-2) + "7";},

            NEAPOLITAN_MINOR: "MENOR NAPOLITANA",
            NEAPOLITAN_MAJOR: "MAYOR NAPOLITAN",

            // 6
            get BLUES_b5(): string {return  "BLUES " + Settings.symbols.alts(-1) + "5";},
            get BLUES_a4(): string {return  "BLUES " + Settings.symbols.alts(1) + "4";},

            WHOLE_TONE: "TONOS ENTEROS",

            // 5
            PENTATONIC_MINOR: "PENTATÓNICA MENOR",
            PENTATONIC: "PENTATÓNICA",
            EGYPCIAN: "EGPPCIA",
            BLUES_MINOR: "BLUES MENOR",
            BLUES_MAJOR: "BLUES MENOR",

            // 12
            CHROMATIC: "CROMÁTICA",

            AUGMENTED_TRIAD: "TRIADA AUMENTADA",
            DIMINISHED_7th: "7ª DISMINUIDA",
            MESSIAEN_V_TRUNCATED: "MESSIAEN V TRUNCATED",
            get DOM7b5(): string {return  "DOM7" + Settings.symbols.alts(-1) + "5";},
            MESSIAEN_INV_III_V_TRUNCATED_n2: "MESSIAEN INV. III V TRUNCATED n2",
            HALF_DIMINISHED: "HALF DIMINISHED",
            MESSIAEN_V: "MESSIAEN V",
            RAGA_INDRUPRIYA_INDIA: "RAGA INDRUPRIYA INDIA",
            MESSIAEN_II_TRUNCATED_n3: "MESSIAEN II TRUNCATED n3",
            MESSIAEN_III_INV: "MESSIAEN III INV",
            MESSIAEN_IV: "MESSIAEN IV",
            MESSIAEN_VI: "MESSIAEN VI",
            MESSIAEN_VII: "MESSIAEN VII",

            BEBOP_MAJOR: "MAYOR BEBOP"
        },
        patterns: {
            TRIAD_MAJOR: "MAYOR",
            TRIAD_MINOR: "MENOR",
            TRIAD_AUGMENTED: "AUMENTADA",
            TRIAD_DIMINISHED: "DISMINUIDA",
            TRIAD_SUS4: "SUS4",
            TRIAD_QUARTAL: "CUARTAL",
            ELEVENTH: "ONCEAVA",
            ELEVENTH_MAJ11: "ONCEAVA MAJ11",
            ELEVENTH_MINOR_MAJ11: "ONCEAVA MINOR MAJ11",
            get ELEVENTH_a9(): string {return  "ONCEAVA " + Settings.mods.a9;},
            get ELEVENTH_b9(): string {return  "ONCEAVA " + Settings.mods.b9;},
            NINTH: "NOVENA",
            NINTH_ADD6: "NOVENA ADD6",
            NINTH_MAJ9: "NOVENA MAJ9",
            get NINTH_MAJ9_a11(): string {return  "NOVENA MAJ9 " + Settings.mods.a11;},
            NINTH_MINOR: "NOVENA MENOR",
            NINTH_MINOR_MAJ9: "NOVENA MENOR MAJ9",
            NINTH_SUS4: "NOVENA SUS4",
            get NINTH_a11(): string {return  "NOVENA " + Settings.mods.a11;},
            get NINTH_a5(): string {return  "NOVENA " + Settings.mods.a5;},
            get NINTH_b5(): string {return  "NOVENA " + Settings.mods.b5;},
            POWER_CHORD: "POWER CHORD",
            SEVENTH: "SÉPTIMA DOMINANTE",
            SEVENTH_ADD11: "SÉPTIMA ADD11",
            SEVENTH_ADD13: "SÉPTIMA ADD13",
            SEVENTH_MAJ7: "SÉPTIMA MAJ7",
            SEVENTH_MINOR: "SÉPTIMA MENOR",
            SEVENTH_MINOR_MAJ7: "SÉPTIMA MENOR MAJ7",
            get SEVENTH_MINOR_a5(): string {return  "SÉPTIMA MENOR " + Settings.mods.a5;},
            get SEVENTH_MINOR_b5(): string {return  "SÉPTIMA MENOR " + Settings.mods.b5;},
            get SEVENTH_MINOR_b9(): string {return  "SÉPTIMA MENOR " + Settings.mods.b9;},
            SEVENTH_SUS4: "SÉPTIMA SUS4",
            get SEVENTH_a5(): string {return  "SÉPTIMA " + Settings.mods.a5;},
            get SEVENTH_a9(): string {return  "SÉPTIMA " + Settings.mods.a9;},
            get SEVENTH_b5(): string {return  "SÉPTIMA " + Settings.mods.b5;},
            get SEVENTH_b9(): string {return  "SÉPTIMA " + Settings.mods.b9;},
            SIXTH: "SEXTA",
            SIXTH_ADD9: "SEXTA ADD9",
            SIXTH_MINOR: "SEXTA MENOR",
            SIXTH_MINOR_ADD9: "SEXTA MENOR ADD9",
            SIXTH_SUS4: "SEXTA SUS4",
            THIRTEENTH_MAJ13: "TRECEAVA MAJ13",
            get THIRTEENTH_MAJ13_a5(): string {return  "TRECEAVA MAJ13 " + Settings.mods.a5;},
            get THIRTEENTH_MAJ13_a5a9(): string {return  "TRECEAVA MAJ13 " + Settings.mods.a5 + Settings.mods.a9;}
        }
    }
}