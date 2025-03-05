import { WordsInput } from "./Input";

type Settings = WordsInput;

export function wordsGenerate(basePart: WordsInput): Settings {
  return {
    note: basePart.note,
    chord: basePart.chord,
    scale: basePart.scale,
    key: basePart.key,
    tuning: basePart.tuning,
    temperament: basePart.temperament,
    degreeFunc: basePart.degreeFunc,
    degree: basePart.degree,
    pitch: basePart.pitch,
    voicing: basePart.voicing,
    inversion: basePart.inversion,
    root: basePart.root,
    noteAlt: basePart.noteAlt,
    diatonic: basePart.diatonic,
  };
}
