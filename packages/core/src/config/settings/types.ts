import { Chord as ChordAlt } from "chords/alt";
import { Chord } from "chords/chromatic";
import type { ConcertPitch } from "concert-pitches/chromatic";
import { Key as KeyAlt } from "keys/alt";
import { Key } from "keys/chromatic";
import { Pitch as DiatonicAlt } from "pitches/alt";
import { Pitch as Chromatic } from "pitches/chromatic";
import { Scale as ScaleAlt } from "scales/alt";
import { Temperament } from "temperaments/chromatic";
import { Tuning } from "tunings/chromatic";
import { Voicing as DiatonicAltPattern } from "voicings/alt";

export type SettingsInterface = {
    default: {
        note: Chromatic;
        diatonicAlt: DiatonicAlt;
        scale: ScaleAlt;
        keyAlt: KeyAlt;
        key: Key;
        chord: Chord;
        chordAlt: ChordAlt;
        voicingAlt: DiatonicAltPattern;
        temperament: Temperament;
        tuning: Tuning;
        concertPitch: ConcertPitch;
    };
};
