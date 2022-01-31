/* eslint-disable accessor-pairs */
import { C as DAC_C, Chord as DAChord } from "chords/alt";
import { C as CC_C, Chord as CChord } from "chords/chromatic";
import { A440, ConcertPitch } from "concert-pitches/chromatic";
import { C as AT_C, Key as DiatonicAltKey } from "keys/alt";
import { C as T_C, Key } from "keys/chromatic";
import { C as DA_C, Pitch as DiatonicAlt } from "pitches/alt";
import { C as C_C, Pitch as Chromatic } from "pitches/chromatic";
import { MAJOR as DA_MAJOR, Scale as ScaleAlt } from "scales/alt";
import { ET12, Temperament } from "temperaments/chromatic";
import { EQUAL_440, Tuning } from "tunings/chromatic";
import { TRIAD_MAJOR as DAV_TRIAD_MAJOR, Voicing as DiatonicAltVoicing } from "voicings/alt";
import { SettingsInterface } from "./types";

const DefaultSettings: SettingsInterface = {
  default: {
    get note(): Chromatic { return C_C; },
    get diatonicAlt(): DiatonicAlt { return DA_C; },
    get scale(): ScaleAlt { return DA_MAJOR; },
    get key(): Key { return T_C; },
    get keyAlt(): DiatonicAltKey { return AT_C; },
    get chord(): CChord { return CC_C; },
    get chordAlt(): DAChord { return DAC_C; },
    get voicingAlt(): DiatonicAltVoicing { return DAV_TRIAD_MAJOR; },
    get temperament(): Temperament { return ET12; },
    get tuning(): Tuning { return EQUAL_440; },
    get concertPitch(): ConcertPitch { return A440; },
  },
};

export default DefaultSettings;
