/* eslint-disable camelcase */
/* eslint-disable accessor-pairs */
import { Input } from "../..";
import { DiatonicsInput, ScalesInput, TemperamentsInput, VoicingsInput } from "../../parts";
import ENG from "../en/Input";

const voicings: VoicingsInput = {
  ADD: "ADD",
  TRITONE: "TRITONO",
  POWER_CHORD: "POWER CHORD",
  MAJOR: "MAYOR",
  MINOR: "MENOR",
  AUGMENTED: "AUMENTADO",
  DIMINISHED: "DISMINUIDO",
  QUARTAL: "CUARTAL",
  ELEVENTH: "ONCEAVA",
  NINTH: "NOVENA",
  SEVENTH: "SÉPTIMA",
  SIXTH: "SEXTA",
  THIRTEENTH: "TRECEAVA",
  SUS: "SUS",
  MAJ: "MAJ",
  SECOND: "SEGUNDA",
  THIRD: "TERCERA",
};
const diatonics: DiatonicsInput = {
  C: "Do",
  D: "Re",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  A: "La",
  B: "Si",
};
const scales: ScalesInput = {
  MAJOR: "MAYOR",
  IONIAN: "JÓNICA",
  MINOR: "MENOR",
  AEOLIAN: "EÓLICA",
  AUGMENTED: "AUMENTADA",
  DORIAN: "DÓRICA",
  PHRYGIAN: "FRIGIA",
  LYDIAN: "LIDIA",
  MIXOLYDIAN: "MIXOLIDIA",
  LOCRIAN: "LOCRIA",
  HARMONIC_MINOR: "MENOR HARMÓNICA",
  HARMONIC_MAJOR: "MAYOR HARMÓNICA",
  MELODIC_MINOR: "MENOR MELÓDICA",
  SUPERLOCRIAN: "SUPERLOCRIA",

  DOUBLE_HARMONIC: "DOBLE HARMÓNICA",
  ULTRAPHRYGIAN: "ULTRAFRIGIA",
  HUNGARIAN_MINOR: "MENOR HÚNGARA",
  ORIENTAL: "ORIENTAL",
  NEAPOLITAN_MINOR: "MENOR NAPOLITANA",
  NEAPOLITAN_MAJOR: "MAYOR NAPOLITAN",

  WHOLE_TONE: "TONOS ENTEROS",

  // 5
  PENTATONIC_MINOR: "PENTATÓNICA MENOR",
  PENTATONIC: "PENTATÓNICA",
  EGYPCIAN: "EGIPCIA",
  BLUES: "BLUES",

  // 12
  CHROMATIC: "CROMÁTICA",

  AUGMENTED_TRIAD: "TRIADA AUMENTADA",
  DIMINISHED_7th: "7ª DISMINUIDA",
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

  BEBOP_MAJOR: "MAYOR BEBOP",
};
const { shortVoicings } = ENG;
const temperaments: TemperamentsInput = {
  ...ENG.temperaments,
  ET12: "T. Igual 12",
  PYTHAGOREAN: "Pitagórico",
};
const words = {
  get note(): string { return "nota"; },
  get chord(): string { return "acorde"; },
  get scale(): string { return "escala"; },
  get key(): string { return "tonalidad"; },
  get tuning(): string { return "afinación"; },
  get temperament(): string { return "temperamento"; },
  get degreeFunction(): string { return "función tonal"; },
  get degree(): string { return "grado"; },
  get pitch(): string { return "pitch"; },
  get voicing(): string { return "patrón"; },
  get inversion(): string { return "inversión"; },
  get root(): string { return "raíz"; },
  get noteAlt(): string { return "nota diatónica alterada"; },
  get diatonic(): string { return "nota diatónica"; },
};
const qualities = {
  perfect: "perfecta",
  major: "mayor",
  minor: "menor",
  augmented: "aumentada",
  diminished: "disminuida",
  doublyDiminished: "doble disminuida",
  doublyAugmented: "doble aumentada",
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
