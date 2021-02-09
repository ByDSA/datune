import { PatternsSettings, ScalesSettings } from "../SettingsInterface";

export interface LanguageInterface {
    id: string,
    diatonic: {
        C: string,
        D: string,
        E: string,
        F: string,
        G: string,
        A: string,
        B: string,
    },
    scales: ScalesSettings,
    patterns: PatternsSettings,
    shortPatterns: PatternsSettings,
    temperaments: {
        ET12: string,
        LIMIT_5_SYMMETRIC_N1: string,
        LIMIT_5_SYMMETRIC_N2: string,
        PYTHAGOREAN: string,
    },
    words: {
        note: string,
        chord: string,
        scale: string,
        tonality: string,
        tuning: string,
        temperament: string,
        degreeFunction: string,
        degree: string,
        pitch: string,
        pattern: string,
        root: string,
        inversion: string,
        noteAlt: string,
        diatonic: string,
    },
    quality: {
        perfect: string,
        major: string,
        minor: string,
        augmented: string,
        diminished: string,
        doublyDiminished: string,
        doublyAugmented: string,
    }
}