/* eslint-disable accessor-pairs */
import { Chords as AC, Chord as AChord } from "chords/alt";
import { Chords as CC, Chord as CChord } from "chords/chromatic";
import { ConcertPitches, ConcertPitch } from "concert-pitches/chromatic";
import { Keys as AK, Key as AKey } from "keys/alt";
import { Keys as CK, Key } from "keys/chromatic";
import { Pitches as AP, Pitch as APitch } from "pitches/alt";
import { Pitches as C, Pitch as CPitch } from "pitches/chromatic";
import { Scales as AS, Scale as AScale } from "scales/alt";
import { Temperaments, Temperament } from "temperaments/chromatic";
import { Tunings, Tuning } from "tunings/chromatic";
import { Voicings as AV, Voicing as AVoicing } from "voicings/alt";
import { SettingsInterface } from "./types";

export const DEFAULT_SETTINGS: SettingsInterface = {
  default: {
    get note(): CPitch { return C.C; },
    get diatonicAlt(): APitch { return AP.C; },
    get scale(): AScale { return AS.MAJOR; },
    get key(): Key { return CK.C; },
    get keyAlt(): AKey { return AK.C; },
    get chord(): CChord { return CC.C; },
    get chordAlt(): AChord { return AC.C; },
    get voicingAlt(): AVoicing { return AV.TRIAD_MAJOR; },
    get temperament(): Temperament { return Temperaments.ET12; },
    get tuning(): Tuning { return Tunings.EQUAL_440; },
    get concertPitch(): ConcertPitch { return ConcertPitches.A440; },
  },
};
