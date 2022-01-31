/* eslint-disable camelcase */
import { Input } from "../..";
import { DiatonicsInput, ScalesInput, ShortVoicingsInput, TemperamentsInput, VoicingsInput } from "../../parts";

const voicings: VoicingsInput = {
  ADD: "ADD",
  TRITONE: "TRITONE",
  POWER_CHORD: "POWER CHORD",
  MAJOR: "MAJOR",
  MINOR: "MINOR",
  AUGMENTED: "AUGMENTED",
  DIMINISHED: "DIMINISHED",
  QUARTAL: "QUARTAL",
  ELEVENTH: "ELEVENTH",
  NINTH: "NINTH",
  SEVENTH: "SEVENTH",
  SIXTH: "SIXTH",
  THIRTEENTH: "THIRTEENTH",
  SUS: "SUS",
  MAJ: "MAJ",
  SECOND: "SECOND",
  THIRD: "THIRD",
};
const diatonics: DiatonicsInput = {
  C: "C",
  D: "D",
  E: "E",
  F: "F",
  G: "G",
  A: "A",
  B: "B",
};
const shortVoicings: ShortVoicingsInput = {
  MINOR: "m",
  MAJOR: "M",
  TRIAD_MAJOR: "",
};
const scales: ScalesInput = {
  MAJOR: "MAJOR",
  IONIAN: "IONIAN",
  MINOR: "MINOR",
  AEOLIAN: "AEOLIAN",
  DORIAN: "DORIAN",
  PHRYGIAN: "PHRYGIAN",
  LYDIAN: "LYDIAN",
  MIXOLYDIAN: "MIXOLYDIAN",
  LOCRIAN: "LOCRIAN",
  AUGMENTED: "AUGMENTED",

  HARMONIC_MINOR: "HARMONIC MINOR",
  HARMONIC_MAJOR: "HARMONIC MAJOR",
  MELODIC_MINOR: "MELODIC MINOR",
  SUPERLOCRIAN: "SUPERLOCRIAN",

  DOUBLE_HARMONIC: "DOUBLE HARMONIC",
  ULTRAPHRYGIAN: "ULTRAPHRYGIAN",
  HUNGARIAN_MINOR: "HUNGARIAN MINOR",
  ORIENTAL: "ORIENTAL",
  NEAPOLITAN_MINOR: "NEAPOLITAN MINOR",
  NEAPOLITAN_MAJOR: "NEAPOLITAN MAJOR",

  WHOLE_TONE: "WHOLE TONE",

  // 5
  PENTATONIC_MINOR: "PENTATONIC MINOR",
  PENTATONIC: "PENTATONIC",
  EGYPCIAN: "EGYPCIAN",
  BLUES: "BLUES",

  // 12
  CHROMATIC: "CHROMATIC",

  AUGMENTED_TRIAD: "AUGMENTED TRIAD",
  DIMINISHED_7th: "DIMINISHED 7th",
  MESSIAEN_V_TRUNCATED: "MESSIAEN V TRUNCATED",
  MESSIAEN_INV_III_V_TRUNCATED_n2: "MESSIAEN INV. III V TRUNCATED n2",
  HALF_DIMINISHED: "HALF DIMINISHED",
  MESSIAEN_V: "MESSIAEN V",
  RAGA_INDRUPRIYA_INDIA: "RAGA INDRUPRIYA INDIA",
  MESSIAEN_II_TRUNCATED_n3: "MESSIAEN II TRUNCATED n3",
  MESSIAEN_III_INV: "MESSIAEN III INV",
  MESSIAEN_IV: "MESSIAEN IV",
  MESSIAEN_VI: "MESSIAEN VI",
  MESSIAEN_VII: "MESSIAEN VII",

  BEBOP_MAJOR: "BEBOP MAJOR",
};
const temperaments: TemperamentsInput = {
  ET12: "12-ET",
  LIMIT_5_SYMMETRIC: "5-LIMIT: SN",
  PYTHAGOREAN: "Pythagorean",
};
const words = {
  note: "note",
  chord: "chord",
  scale: "scale",
  key: "key",
  tuning: "tuning",
  temperament: "temperament",
  degreeFunction: "degree function",
  degree: "degree",
  pitch: "pitch",
  voicing: "voicing",
  inversion: "inversion",
  root: "root",
  noteAlt: "altered diatonic note",
  diatonic: "diatonic note",
};
const qualities = {
  perfect: "perfect",
  major: "major",
  minor: "minor",
  augmented: "augmented",
  diminished: "diminished",
  doublyDiminished: "doubly diminished",
  doublyAugmented: "doubly augmented",
};
const fix: Input = {
  voicings,
  diatonics,
  shortVoicings,
  scales,
  temperaments,
  words,
  qualities,
};

export default fix;
