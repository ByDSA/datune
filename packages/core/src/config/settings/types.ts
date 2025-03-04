import type { ConcertPitch } from "concert-pitches/chromatic";
import type { Chord as AChord } from "chords/alt";
import type { Chord } from "chords/chromatic";
import type { Key as AKey } from "keys/alt";
import type { Key } from "keys/chromatic";
import type { Pitch as APitch } from "pitches/alt";
import type { Pitch as CPitch } from "pitches/chromatic";
import type { Scale as AScale } from "scales/alt";
import type { Temperament } from "temperaments/chromatic";
import type { Tuning } from "tunings/chromatic";
import type { Voicing as AVoicing } from "voicings/alt";

export type SettingsInterface = {
    default: {
        note: CPitch;
        diatonicAlt: APitch;
        scale: AScale;
        keyAlt: AKey;
        key: Key;
        chord: Chord;
        chordAlt: AChord;
        voicingAlt: AVoicing;
        temperament: Temperament;
        tuning: Tuning;
        concertPitch: ConcertPitch;
    };
};
