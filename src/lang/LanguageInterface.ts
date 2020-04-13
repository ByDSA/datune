export interface LanguageInterface {
    diatonic: {
        C: string,
        D: string,
        E: string,
        F: string,
        G: string,
        A: string,
        B: string,
    },
    scales: {
        MAJOR: string,
        MINOR: string,
        DORIAN: string,
        PHRYGIAN: string,
        LYDIAN: string,
        MIXOLYDIAN: string,
        LOCRIAN: string,

        HARMONIC_MINOR: string,
        LOCRIAN_a6: string,
        IONIAN_a5: string,
        DORIAN_a4: string,
        MIXOLYDIAN_b9_b13: string,
        LYDIAN_a2: string,
        SUPERLOCRIAN_bb7: string,

        HARMONIC_MAJOR: string,
        DORIAN_b5: string,
        PHRYGIAN_b4: string,
        LYDIAN_b3: string,
        MIXOLYDIAN_b2: string,
        AEOLIAN_b1: string,
        LOCRIAN_bb7: string,

        MELODIC_MINOR: string,
        DORIAN_b2: string,
        LYDIAN_a5: string,
        LYDIAN_b7: string,
        MIXOLYDIAN_b13: string,
        LOCRIAN_a2: string,
        SUPERLOCRIAN: string,

        DOUBLE_HARMONIC: string,
        LYDIAN_a2_a6: string,
        ULTRAPHRYGIAN: string,
        HUNGARIAN_MINOR: string,
        ORIENTAL: string,
        IONIAN_AUGMENTED_a2: string,
        LOCRIAN_bb3_bb7: string,

        NEAPOLITAN_MINOR: string,
        NEAPOLITAN_MAJOR: string,

        // 6
        BLUES_b5: string,
        BLUES_a4: string,

        WHOLE_TONE: string,

        // 5
        PENTATONIC_MINOR: string,
        PENTATONIC: string,
        EGYPCIAN: string,
        BLUES_MINOR: string,
        BLUES_MAJOR: string,

        // 12
        CHROMATIC: string,

        AUGMENTED_TRIAD: string,
        DIMINISHED_7th: string,
        MESSIAEN_V_TRUNCATED: string,
        DOM7b5: string,
        MESSIAEN_INV_III_V_TRUNCATED_n2: string,
        HALF_DIMINISHED: string,
        MESSIAEN_V: string,
        RAGA_INDRUPRIYA_INDIA: string,
        MESSIAEN_II_TRUNCATED_n3: string,
        MESSIAEN_III_INV: string,
        MESSIAEN_IV: string,
        MESSIAEN_VI: string,
        MESSIAEN_VII: string,

        BEBOP_MAJOR: string,
    },
    patterns: {
        TRIAD_MAJOR: string,
        TRIAD_MINOR: string,
        TRIAD_AUGMENTED: string,
        TRIAD_DIMINISHED: string,
        TRIAD_SUS4: string,
        TRIAD_QUARTAL: string,
        ELEVENTH: string,
        ELEVENTH_MAJ11: string,
        ELEVENTH_MINOR_MAJ11: string,
        ELEVENTH_a9: string,
        ELEVENTH_b9: string,
        NINTH: string,
        NINTH_ADD6: string,
        NINTH_MAJ9: string,
        NINTH_MAJ9_a11: string,
        NINTH_MINOR: string,
        NINTH_MINOR_MAJ9: string,
        NINTH_SUS4: string,
        NINTH_a11: string,
        NINTH_a5: string,
        NINTH_b5: string,
        POWER_CHORD: string,
        SEVENTH: string,
        SEVENTH_ADD11: string,
        SEVENTH_ADD13: string,
        SEVENTH_MAJ7: string,
        SEVENTH_MINOR: string,
        SEVENTH_MINOR_MAJ7: string,
        SEVENTH_MINOR_a5: string,
        SEVENTH_MINOR_b5: string,
        SEVENTH_MINOR_b9: string,
        SEVENTH_SUS4: string,
        SEVENTH_a5: string,
        SEVENTH_a9: string,
        SEVENTH_b5: string,
        SEVENTH_b9: string,
        SIXTH: string,
        SIXTH_ADD9: string,
        SIXTH_MINOR: string,
        SIXTH_MINOR_ADD9: string,
        SIXTH_SUS4: string,
        THIRTEENTH_MAJ13: string,
        THIRTEENTH_MAJ13_a5: string,
        THIRTEENTH_MAJ13_a5a9: string,
    },
    shortPatterns: {
        TRIAD_MAJOR: string,
        TRIAD_MINOR: string,
        TRIAD_AUGMENTED: string,
        TRIAD_DIMINISHED: string,
        TRIAD_SUS4: string,
        TRIAD_QUARTAL: string,
        ELEVENTH: string,
        ELEVENTH_MAJ11: string,
        ELEVENTH_MINOR_MAJ11: string,
        ELEVENTH_a9: string,
        ELEVENTH_b9: string,
        NINTH: string,
        NINTH_ADD6: string,
        NINTH_MAJ9: string,
        NINTH_MAJ9_a11: string,
        NINTH_MINOR: string,
        NINTH_MINOR_MAJ9: string,
        NINTH_SUS4: string,
        NINTH_a11: string,
        NINTH_a5: string,
        NINTH_b5: string,
        POWER_CHORD: string,
        SEVENTH: string,
        SEVENTH_ADD11: string,
        SEVENTH_ADD13: string,
        SEVENTH_MAJ7: string,
        SEVENTH_MINOR: string,
        SEVENTH_MINOR_MAJ7: string,
        SEVENTH_MINOR_a5: string,
        SEVENTH_MINOR_b5: string,
        SEVENTH_MINOR_b9: string,
        SEVENTH_SUS4: string,
        SEVENTH_a5: string,
        SEVENTH_a9: string,
        SEVENTH_b5: string,
        SEVENTH_b9: string,
        SIXTH: string,
        SIXTH_ADD9: string,
        SIXTH_MINOR: string,
        SIXTH_MINOR_ADD9: string,
        SIXTH_SUS4: string,
        THIRTEENTH_MAJ13: string,
        THIRTEENTH_MAJ13_a5: string,
        THIRTEENTH_MAJ13_a5a9: string,
    }
}