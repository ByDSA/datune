/* eslint-disable accessor-pairs */
import { SettingsInterface } from "./types";
import { Chords as DAC, Chord as DAChord } from "chords/alt";
import { Chords as CC, Chord as CChord } from "chords/chromatic";
import { ConcertPitches, ConcertPitch } from "concert-pitches/chromatic";
import { Keys as AK, Key as DiatonicAltKey } from "keys/alt";
import { Keys as CK, Key } from "keys/chromatic";
import { Pitches as DA, Pitch as DiatonicAlt } from "pitches/alt";
import { Pitches as C, Pitch as Chromatic } from "pitches/chromatic";
import { Scales as DAS, Scale as ScaleAlt } from "scales/alt";
import { Temperaments, Temperament } from "temperaments/chromatic";
import { Tunings, Tuning } from "tunings/chromatic";
import { Voicings as DAV, Voicing as DiatonicAltVoicing } from "voicings/alt";

export const DEFAULT_SETTINGS: SettingsInterface = {
  default: {
    get note(): Chromatic { return C.C; },
    get diatonicAlt(): DiatonicAlt { return DA.C; },
    get scale(): ScaleAlt { return DAS.MAJOR; },
    get key(): Key { return CK.C; },
    get keyAlt(): DiatonicAltKey { return AK.C; },
    get chord(): CChord { return CC.C; },
    get chordAlt(): DAChord { return DAC.C; },
    get voicingAlt(): DiatonicAltVoicing { return DAV.TRIAD_MAJOR; },
    get temperament(): Temperament { return Temperaments.ET12; },
    get tuning(): Tuning { return Tunings.EQUAL_440; },
    get concertPitch(): ConcertPitch { return ConcertPitches.A440; },
  },
};
